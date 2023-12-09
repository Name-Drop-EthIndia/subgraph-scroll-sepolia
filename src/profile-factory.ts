import { ProfileMinted as ProfileMintedEvent } from "../generated/ProfileFactory/ProfileFactory"
import { MomentMinted as MomentMintedEvent } from "../generated/templates/ProfileNft/ProfileNft"
import { Profile, Moment } from "../generated/schema"
import { ProfileNft as ProfileDatasource } from "../generated/templates"

export function handleProfileMinted(event: ProfileMintedEvent): void {
	let entity = new Profile(
		event.params.profileAddress.toHexString()
	)
	entity.profileAddress = event.params.profileAddress.toHexString()
	entity.owner = event.params.owner.toHexString()
	entity.uri = event.params.uri.toHexString()
	entity.save()
	ProfileDatasource.create(event.params.profileAddress)
}

export function handleMomentMinted(event: MomentMintedEvent): void {
	// let entity = Moment.load(event.address.toHexString() + "-" + event.params.tokenId.toHexString())
	// if (!entity) {
	let entity = new Moment(
		event.address.toHexString() + "-" + event.params.tokenId.toHexString(),
	)
	entity.eventId = event.params.eventId
	entity.tokenId = event.params.tokenId
	entity.profile = event.params.profile2.toHexString()
	// }
	entity.save()
}
