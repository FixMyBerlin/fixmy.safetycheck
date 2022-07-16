import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { LayoutArticle } from '~/components/Layout'
import { useStore } from 'zustand'
import { useStoreExperimentData } from '~/components/Scenes/store'
import { ScenesOpenstreetmapTagsPage } from '~/components/ScenesOpenstreetmapTagsPage'

const AllPagePrimary = ({
  data: {
    allScenesPrimaryCsv: { edges: sceneNodes },
  },
}) => {
  const { setExperimentTextKey } = useStore(useStoreExperimentData)
  useEffect(() => setExperimentTextKey('primary'), [])

  return (
    <LayoutArticle maxWidthClass="max-w-full lg:mx-5">
      {/* <MetaTags> are part of <ScenesOpenstreetmapTagsPage> */}
      <ScenesOpenstreetmapTagsPage rawScenes={sceneNodes} />
    </LayoutArticle>
  )
}

export default AllPagePrimary

export const query = graphql`
  query {
    allScenesPrimaryCsv {
      edges {
        node {
          sceneId
          sceneIdCar
          sceneIdPedestrian

          bicycleLaneSurface
          bicycleLaneUsableWidthNumber
          bicycleLaneWidth
          bicycleLaneWidthNumber
          bufferHasPhysicalProtection
          bufferLeftMarking
          bufferLeftPhysicalProtection
          bufferLeftWidth
          bufferLeftWidthNumber
          bufferRightMarking
          bufferRightWidth
          bufferRightWidthNumber
          leftOfBicycleLane
          location
          parking
          pavementHasShops
          pavementWidth
          pavementWidthNumber
          vehicleLaneMaxspeed
          vehicleLaneUsage
          vehicleTrafficVolume

          vote0Unsafe
          vote1RatherUnsafe
          vote2Save
          voteCar3VerySave
          vote3VerySave
          voteCount
          voteMeans
          voteScore
          voteCar0Unsafe
          voteCar1RatherUnsafe
          voteCar2Save
          voteCarCount
          voteCarMeans
          voteCarScore
          votePedestrian0Unsafe
          votePedestrian1RatherUnsafe
          votePedestrian2Save
          votePedestrian3VerySave
          votePedestrianCount
          votePedestrianMeans
          votePedestrianScore

          path: gatsbyPath(
            filePath: "/hauptstrassen/{scenesPrimaryCsv.sceneId}"
          )
        }
      }
    }
  }
`
