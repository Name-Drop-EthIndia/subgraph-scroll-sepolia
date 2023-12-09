import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { ProfileMinted } from "../generated/ProfileFactory/ProfileFactory"

export function createProfileMintedEvent(
  profileAddress: Address,
  owner: Address,
  uri: string
): ProfileMinted {
  let profileMintedEvent = changetype<ProfileMinted>(newMockEvent())

  profileMintedEvent.parameters = new Array()

  profileMintedEvent.parameters.push(
    new ethereum.EventParam(
      "profileAddress",
      ethereum.Value.fromAddress(profileAddress)
    )
  )
  profileMintedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  profileMintedEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return profileMintedEvent
}
