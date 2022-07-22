import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { useStore } from 'zustand'
import { LayoutScenes } from '~/components/Layout'
import { ScenesPage } from '~/components/ScenesPage'
import {
  aggregationConfigSecondary,
  itemJsConfigSecondary,
  presetsScenesSecondary,
} from '~/components/ScenesPage/constants'
import {
  useStoreExperimentData,
  useStorePreset,
} from '~/components/ScenesPage/store'

const MyDataIndex = ({
  location,
  data: {
    allScenesSecondaryCsv: { edges: rawScenes },
  },
}) => {
  const { setItemJsConfig, setAggregationConfig, setExperimentTextKey } =
    useStore(useStoreExperimentData)
  const { setPresets } = useStore(useStorePreset)

  useEffect(() => {
    setItemJsConfig(itemJsConfigSecondary)
    setAggregationConfig(aggregationConfigSecondary)
    setExperimentTextKey('secondary')
    setPresets(presetsScenesSecondary)
  }, [])

  return (
    <LayoutScenes>
      {/* <MetaTags> are part of <Scenes> */}
      <ScenesPage rawScenes={rawScenes} location={location} />
    </LayoutScenes>
  )
}

export default MyDataIndex

export const query = graphql`
  query {
    allScenesSecondaryCsv {
      edges {
        node {
          sceneId
          sceneIdCar

          parkingCategory
          carriagewayDirection
          bicycleStreetType
          carriagewayWidth
          carriagewayWidthNumber
          motorVehicleTrafficVolumen

          voteCarScore
          voteCar0Unsafe
          voteCar1RatherUnsafe
          voteCar2Save
          voteCar3VerySave
          voteCarCount
          voteCarMeans

          voteScore
          vote0Unsafe
          vote1RatherUnsafe
          vote2Save
          vote3VerySave
          voteCount
          voteMeans

          path: gatsbyPath(
            filePath: "/nebenstrassen/{scenesSecondaryCsv.sceneId}"
          )
        }
      }
    }
  }
`
