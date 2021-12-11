
import React from "react"
import { Col } from "react-bootstrap"

export function getHotels() {
    return fetch('http://localhost:8081/hotels')
      .then(data => data.json())
}

export function getHotel(id) {
  console.log(id)
  return fetch(`http://localhost:8081/hotels/${id}`)
    .then(data => data.json())
}

export function sendHotel(formInputs) {
    //console.log(formInputs)
    const hotel = {
        "name" : formInputs.name,
        "address" : formInputs.address,
        "city" : formInputs.city,
        "country" : formInputs.country,
        "description" : formInputs.description,
        "website" : formInputs.website,
        "activities" : formInputs.activities,
        "values" : {
            "NoSingleUsePlastic" : formInputs.values_0,
            "WasteRecycling" : formInputs.values_1,
            "RenewableEnergy" : formInputs.values_2,
            "EnergyEfficiency" : formInputs.values_3,
            "OrganicFarm" : formInputs.values_4,
            "SustainablySourcedFood" : formInputs.values_5,
            "MarineConservation" : formInputs.values_6,
            "ForestConservation" : formInputs.values_7,
            "WildlifeProtection" : formInputs.values_8,
            "CleanupActivities" : formInputs.values_9,
            "LocalOwned" : formInputs.values_10,
            "LocalEducation" : formInputs.values_11,
            "SupportsLocalNGO" : formInputs.values_12,
            "SupportsLocalBusinesses" : formInputs.values_13,
            "NaturalElements" : formInputs.values_14
        },
        "certifications" : {
            "EarthCheck" : formInputs.certs_0,
            "GreenKey" : formInputs.certs_1,
            "GreenGlobe" : formInputs.certs_2,
            "GSTC" : formInputs.certs_3,
            "TravelLife" : formInputs.certs_4,
            "Biosphere" : formInputs.certs_5
        },
        "tags" : {
            "EnvironmentFriendly" : formInputs.tags_0,
            "CommunityChampion" : formInputs.tags_1,
            "Regenerative" : formInputs.tags_2,
            "CarbonNeutral" : formInputs.tags_3

        }
    }
    console.log(hotel)
    return fetch('http://localhost:8081/hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hotel)
    })
      .then(data => data.json())
}