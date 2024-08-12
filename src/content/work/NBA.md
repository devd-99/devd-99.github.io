---
title: NBA Realtime Action Classification
publishDate: 2024-05-15 00:00:00
img: /image/nba.webp
img_alt: Utilized MAE models to classify whether a 3PM, 2PM, or FTs went in/went out.
description: |
  Utilized MAE models to classify whether a 3PM, 2PM, or FTs went in/went out.
niches:
  - CV
  - DL
tags:
  - Computer Vision
  - Deep Learning
---

# NBA Action Prediction Using VideoMAE
## A Technical Deep Dive

In the realm of sports analytics, the ability to automatically detect and classify actions in basketball games has become increasingly valuable. This article explores an innovative approach to NBA action prediction using VideoMAE (Video Masked Autoencoder), a state-of-the-art video understanding model. We'll delve into the technical aspects of data preprocessing, model architecture, training process, and results, providing insights into the challenges and solutions encountered during the development of this cutting-edge system.

<u><b>Note:</b></u> This project was undertaken with the Realtime Big Data Analytics course under Prof. Lakshminarayanan Subramanian at New York University, Courant Institute of Mathematical Sciences.

### Introduction

The NBA generates a vast amount of video data, and automating the analysis of this content can provide valuable insights for teams, broadcasters, and fans alike. Our project aims to leverage the power of deep learning, specifically the VideoMAE model, to accurately predict and classify actions in NBA game footage. This article will provide a comprehensive overview of our methodology, implementation details, and results.

### Data Acquisition and Preprocessing

#### NBA API Integration

One of the crucial aspects of our project was obtaining high-quality, relevant video data. We developed a custom Python script to interact with the NBA's official API, allowing us to programmatically download video clips of specific game events. Here's a snippet of our `download_nba_video` function:

```python
def download_nba_video(gameID, eventID, date):
    base_url = 'https://stats.nba.com/stats/videoeventsasset'
    video_url = base_url + '?GameEventID=%s&GameID=%s' % (eventID, gameID)
    
    # ... (headers and request setup)

    response = requests.get(video_url, headers=headers, params={'GameEventID': eventID, 'GameID': gameID}, timeout=20)
    json_data = response.json()
    uuid = json_data['resultSets']['Meta']['videoUrls'][0]['uuid']

    final_video_url = f'https://videos.nba.com/nba/pbp/media/{date}/{gameID}/{eventID}/{uuid}_1280x720.mp4'

    # Download and save the video
    video_response = requests.get(final_video_url, allow_redirects=True)
    with open(f"./dataset/{ str(gameID) + '-' + str(eventID) }.mp4", 'wb') as f:
        f.write(video_response.content)
```

This function handles the complexities of interacting with the NBA API, including proper header management and error handling. It allows us to build a comprehensive dataset of basketball actions for our model to learn from.

### Dataset Organization and Structure

A crucial aspect of our NBA action prediction project is the organization and structure of our datasets. We focused on two primary types of actions: Field Goal Attempts (FGA) and Free Throws (FT). The careful curation and organization of these datasets played a significant role in the success of our model.

#### Field Goal Attempt (FGA) Dataset

The FGA dataset comprises 72 video clips, each capturing a field goal attempt in an NBA game. This dataset is organized as follows:

1. **Directory Structure:**
   ```
   dataset/
   ├── train/
   │   ├── made/
   │   └── missed/
   ├── val/
   │   ├── made/
   │   └── missed/
   └── test/
       ├── made/
       └── missed/
   ```

2. **Video Naming Convention:** Each video is named using the format `{gameID}-{eventID}.mp4`, providing a unique identifier for each clip.

3. **Manual Curation:** The FGA clips were manually cropped to focus on the critical moment of the shot attempt, starting from the player initiating the shot and ending when the ball is passed behind the baseline (indicating a made or missed shot).

4. **Class Balance:** Care was taken to ensure a relatively balanced distribution between "made" and "missed" shots across the train, validation, and test sets.

5. **Consistent Camera Angle:** All FGA clips were selected from the main broadcast camera angle, providing consistency in the visual perspective.

#### Free Throw (FT) Dataset

The FT dataset is larger and more diverse, consisting of 140 video clips. Its organization differs slightly from the FGA dataset:

1. **Directory Structure:**
   ```
   ftdataset/
   ├── train/
   │   ├── made/
   │   └── missed/
   ├── val/
   │   ├── made/
   │   └── missed/
   └── test/
       ├── made/
       └── missed/
   ```

2. **Video Naming Convention:** Similar to the FGA dataset, each video is named `{gameID}-{eventID}.mp4`.

3. **Minimal Processing:** Unlike the FGA dataset, the FT clips were not manually cropped. They were used as obtained directly from the NBA API, presenting a more challenging and realistic scenario for the model.

4. **Multiple Camera Angles:** The FT dataset includes clips from various camera angles, adding complexity and requiring the model to generalize across different perspectives.

5. **Longer Duration:** FT clips typically have a longer duration compared to FGA clips, as they often include the player's pre-shot routine.

#### Dataset Handling in Code

To efficiently work with these datasets, we utilized the `pytorchvideo` library's `Ucf101` dataset class, adapting it to our directory structure:

```python
train_dataset = pytorchvideo.data.Ucf101(
    data_path=os.path.join(dataset_root_path, "train"),
    clip_sampler=pytorchvideo.data.make_clip_sampler("uniform", clip_duration),
    decode_audio=False,
    transform=train_transform,
)

val_dataset = pytorchvideo.data.Ucf101(
    data_path=os.path.join(dataset_root_path, "val"),
    clip_sampler=pytorchvideo.data.make_clip_sampler("uniform", clip_duration),
    decode_audio=False,
    transform=val_transform,
)

test_dataset = pytorchvideo.data.Ucf101(
    data_path=os.path.join(dataset_root_path, "test"),
    clip_sampler=pytorchvideo.data.make_clip_sampler("uniform", clip_duration),
    decode_audio=False,
    transform=val_transform,
)
```

This approach allowed us to leverage the robust data loading and preprocessing capabilities of `pytorchvideo` while maintaining our custom dataset organization.

#### Dataset Challenges and Considerations

1. **Size Limitations:** With 72 FGA clips and 140 FT clips, our datasets are relatively small. This limitation required careful consideration of overfitting risks and emphasized the importance of effective data augmentation techniques.

2. **Class Imbalance:** Ensuring a balanced representation of "made" and "missed" shots was crucial, particularly for the smaller FGA dataset.

3. **Variety vs. Consistency:** The FT dataset's inclusion of multiple camera angles introduced valuable variety but also increased the challenge of consistent feature extraction.

4. **Temporal Variations:** Differences in clip duration, especially between FGA and FT datasets, required careful handling in the temporal subsampling process to ensure consistent input to the VideoMAE model.

5. **Generalization Concerns:** With the limited size of the datasets, ensuring that the model generalizes well to unseen data was a key consideration throughout the training process.

By understanding and addressing these dataset characteristics and challenges, we were able to effectively train our VideoMAE model to achieve high accuracy in NBA action prediction, particularly in distinguishing between made and missed shots.

#### Video Preprocessing

Once we obtained the video clips, we needed to preprocess them to ensure compatibility with our VideoMAE model. We utilized the `pytorchvideo` library to handle video transformations efficiently. Here's an overview of our preprocessing pipeline:

```python
train_transform = Compose([
    ApplyTransformToKey(
        key="video",
        transform=Compose([
            UniformTemporalSubsample(num_frames_to_sample),
            Lambda(lambda x: x / 255.0),
            Normalize(mean, std),
            RandomShortSideScale(min_size=256, max_size=320),
            RandomCrop(resize_to),
            RandomHorizontalFlip(p=0.5),
        ]),
    ),
])
```

This transformation pipeline includes:
1. Temporal subsampling to ensure a consistent number of frames
2. Pixel normalization
3. Random scaling and cropping for data augmentation
4. Random horizontal flipping to further increase dataset diversity

### Model Architecture: VideoMAE

We chose to use the VideoMAE model, which is based on the Masked Autoencoder approach and has shown impressive results in video understanding tasks. The key advantages of VideoMAE include:

1. Self-supervised pretraining on large-scale video datasets
2. Efficient handling of temporal information
3. Robust feature extraction capabilities

To adapt VideoMAE for our specific task of NBA action prediction, we utilized the Hugging Face Transformers library:

```python
from transformers import VideoMAEImageProcessor, VideoMAEForVideoClassification

model_ckpt = "MCG-NJU/videomae-base"
image_processor = VideoMAEImageProcessor.from_pretrained(model_ckpt)
model = VideoMAEForVideoClassification.from_pretrained(
    model_ckpt,
    label2id=label2id,
    id2label=id2label,
    ignore_mismatched_sizes=True,
)
```

We fine-tuned this pre-trained model on our NBA action dataset, allowing it to learn the specific patterns and features relevant to basketball actions.

### Training Process

Our training process leveraged the Hugging Face Trainer API, which simplifies the implementation of training loops and evaluation procedures. Here's a summary of our training configuration:

```python
args = TrainingArguments(
    new_model_name,
    remove_unused_columns=False,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    learning_rate=5e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_ratio=0.1,
    logging_steps=10,
    load_best_model_at_end=True,
    metric_for_best_model="accuracy",
    push_to_hub=True,
    max_steps=(train_dataset.num_videos // 8) * num_epochs,
)

trainer = Trainer(
    model,
    args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
    tokenizer=image_processor,
    compute_metrics=compute_metrics,
    data_collator=collate_fn,
)

train_results = trainer.train()
```

Key aspects of our training process include:
- Learning rate of 5e-5 with a warmup period
- Batch size of 8 for both training and evaluation
- Evaluation and model saving after each epoch
- Custom compute_metrics function for accuracy calculation
- Automatic mixed precision training for efficiency

### Results and Analysis

Our initial results showed promising performance in classifying NBA actions:

1. Field Goal Attempts: We achieved 100% accuracy in distinguishing between made and missed field goal attempts, even on external data not seen during training.

2. Free Throw Attempts: For multi-angle free throw classification, we observed 90% precision and 83% accuracy on our test dataset. This is particularly impressive considering the dataset wasn't manually cropped and included multiple camera angles.

These results demonstrate the power of the VideoMAE model in understanding complex basketball actions. The high accuracy in field goal attempt classification suggests that the model has successfully learned to recognize the subtle differences between successful and unsuccessful shots.

### Challenges and Future Work

While our initial results are encouraging, there are several areas for potential improvement and expansion:

1. Expanding action types: Our current model focuses primarily on shot attempts. Future work could involve expanding the range of actions to include passes, dribbles, defensive plays, and more.

2. Real-time processing: Implementing the model for real-time video analysis during live games would be a valuable next step.

3. Player tracking: Integrating player identification and tracking could provide additional context for action prediction.

4. Multi-modal analysis: Combining video analysis with audio (e.g., crowd reactions, commentator remarks) could potentially improve prediction accuracy.

5. Temporal context: Enhancing the model's ability to consider longer-term game context (e.g., score, time remaining) in its predictions.

### Conclusion

Our project demonstrates the potential of deep learning techniques, particularly the VideoMAE model, in automating NBA action prediction. By leveraging advanced video preprocessing techniques and fine-tuning a state-of-the-art model, we've achieved impressive accuracy in classifying shot attempts.

This work lays the foundation for more comprehensive basketball analytics systems, potentially revolutionizing how teams, broadcasters, and fans interact with and understand the game. As we continue to refine our approach and expand its capabilities, we anticipate even more exciting applications in the world of sports analytics.