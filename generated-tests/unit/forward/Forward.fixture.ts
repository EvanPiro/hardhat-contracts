import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import type { Forward } from "../../../typechain-types/contracts/Forward";
import type { Forward__factory } from "../../../typechain-types/factories/contracts/Forward__factory";

export async function forwardFixture(): Promise<{ forward: Forward }> {
  const signers = await ethers.getSigners();
  const deployer: SignerWithAddress = signers[0];

  const ForwardFactory: Forward__factory = (await ethers.getContractFactory(
    "Forward"
  )) as Forward__factory;

  /* Autogenerated arguments for deploy */
  /* Please change accordingly */
  type DeployArgs = Parameters<typeof ForwardFactory.deploy>;
  const args: DeployArgs = {} as DeployArgs;

  const forward: Forward = (await ForwardFactory.connect(deployer).deploy(
    ...args
  )) as Forward;

  return { forward };
}
