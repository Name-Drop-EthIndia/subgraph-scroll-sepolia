import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ProfileMinted } from "../generated/schema"
import { ProfileMinted as ProfileMintedEvent } from "../generated/ProfileFactory/ProfileFactory"
import { handleProfileMinted } from "../src/profile-factory"
import { createProfileMintedEvent } from "./profile-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let profileAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let uri = "Example string value"
    let newProfileMintedEvent = createProfileMintedEvent(
      profileAddress,
      owner,
      uri
    )
    handleProfileMinted(newProfileMintedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ProfileMinted created and stored", () => {
    assert.entityCount("ProfileMinted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ProfileMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "profileAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ProfileMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ProfileMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "uri",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
