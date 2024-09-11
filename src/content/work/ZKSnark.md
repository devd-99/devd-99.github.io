---
title: ZKSnark on Solana
publishDate: 2024-09-11 00:00:00
img: /image/groth.jpg
img_alt: Utilizing Solana Programs from a Spotify Dupe PWA
description: |
  Utilizing Solana Programs from a Spotify Dupe PWA
niches:
  - Blockchain
tags:
  - Blockchain
  - Rust
links:
  - github.com/devd-99/solana-spotify
---
# Zero-Knowledge Proof Multiplier on Solana

This project implements a zk-SNARK (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) system on Solana to verify multiplications without revealing input factors. It demonstrates the integration of Circom circuits, the Groth16 proving system, and Solana's cryptographic primitives.

## Technical Stack

- Circuit Language: Circom
- Proving System: Groth16
- Blockchain: Solana (targeting v1.17+ for full compatibility)
- Libraries: snarkjs, ffjavascript
- Development Environment: Rust, TypeScript

## Key Components

### 1. Circom Circuit

```circom
template Multiplier() {
   signal private input a;
   signal private input b;
   signal output c;
   c <== a * b;
}
component main = Multiplier();
```

This circuit defines the computation to be proved: `c = a * b`, where `a` and `b` are private inputs.

### 2. Trusted Setup

Utilizes Powers of Tau ceremony for the initial setup:

1. Initialize parameters: `powersoftau new bn128 12 pot12_0000.ptau`
2. Contribute randomness: `powersoftau contribute pot12_0000.ptau pot12_0001.ptau`
3. Apply random beacon: `powersoftau beacon pot12_0001.ptau pot12_beacon.ptau`
4. Prepare for phase 2: `powersoftau prepare phase2 pot12_beacon.ptau pot12_final.ptau`

### 3. Circuit Compilation

Compiles the Circom circuit to generate R1CS, WASM, and symbolic files:

```bash
circom Multiplier.circom --r1cs --wasm --sym
```

### 4. Solana Verifier Contract

Exports the verification key and implements Groth16 verification:

```rust
pub const VERIFYINGKEY: Groth16Verifyingkey = Groth16Verifyingkey {
    // ... (elliptic curve points)
};

pub fn verify(&mut self) -> Result<bool, Groth16Error> {
    self.prepare_inputs()?;
    // ... (pairing checks implementation)
}
```

Utilizes Solana's `alt_bn128` syscalls for efficient pairing operations.

### 5. Proof Generation and Verification

TypeScript code for generating and formatting proofs:

```typescript
let { proof, publicSignals } = await snarkjs.groth16.fullProve(input, wasmPath, zkeyPath);

let curve = await buildBn128();
let proofProc = unstringifyBigInts(proof);
publicSignals = unstringifyBigInts(publicSignals);

let pi_a = g1Uncompressed(curve, proofProc.pi_a);
let pi_b = g2Uncompressed(curve, proofProc.pi_b);
let pi_c = g1Uncompressed(curve, proofProc.pi_c);
```

### 6. On-chain Verification

Rust test function for on-chain proof verification:

```rust
#[test]
fn proof_verification_should_succeed() {
    let mut verifier = Groth16Verifier::new(&proof_a, &proof_b, &proof_c, &PUBLIC_INPUTS, &VERIFYING_KEY).unwrap();
    verifier.verify().unwrap();
}
```

## Technical Challenges and Solutions

1. **Endianness Conversion**: Implemented custom functions to handle big-endian to little-endian conversion for Solana compatibility.

2. **Proof Formatting**: Developed utility functions (`g1Uncompressed`, `g2Uncompressed`) to format elliptic curve points for the Solana program.

3. **Compute Budget**: Implemented compute budget instructions to allocate sufficient resources for on-chain verification:

   ```typescript
   transaction.add(web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 1_400_000 }));
   transaction.add(web3.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 2 }));
   ```

4. **Solana Versioning**: Project targets Solana v1.17+ due to the requirement for efficient pairing operations via new syscalls.

## Performance Considerations

- Proof generation is performed off-chain to minimize on-chain computation.
- Verification requires approximately 200,000 compute units on Solana.
- The `alt_bn128` curve is used for its efficiency in pairing operations.

## Security Notes

- The security of the system relies on the integrity of the trusted setup phase.
- The verifier contract must be correctly deployed and not tampered with.
- Input validation is crucial to prevent invalid proof submissions.

## Future Optimizations

1. Implement recursive SNARKs for improved scalability.
2. Explore Plonk or other proving systems for potentially reduced proof sizes.
3. Implement batched verification for improved throughput.