# Beacon Proxies

Multiple proxies relying on the same logic contract can be deployed and updated via the beacon proxy update pattern. The following steps are required:
1. Deploy the logic contract
2. Deploy a beacon. 
```typescript
const Contract = await ethers.getContractFactory("Contract");
const beacon = await upgrades.deployBeacon(Contract);
```
3. Deploy proxies
```typescript
proxy1 = await upgrades.deployBeaconProxy(
    beacon,
    Contract,
    "contract args",
    {
      initializer: "initialize",
    }
  );
```
4. Upgrade beacon
```typescript
const Contract = await ethers.getContractFactory("ContractV2");
await upgrades.upgradeBeacon(beacon.address, ContractV2);
```
