import { ProfileMinted as ProfileMintedEvent } from "../generated/ProfileFactory/ProfileFactory"
import { ProfileMinted } from "../generated/schema"

export function handleProfileMinted(event: ProfileMintedEvent): void {
  let entity = new ProfileMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.profileAddress = event.params.profileAddress
  entity.owner = event.params.owner
  entity.uri = event.params.uri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
