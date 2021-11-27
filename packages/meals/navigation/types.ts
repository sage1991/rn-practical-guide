import { CompositeScreenProps } from "@react-navigation/native"
import { StackScreenProps as RNStackScreenProps } from "@react-navigation/stack"
import { BottomTabScreenProps as RNBottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { DrawerScreenProps as RNDrawerScreenProps } from "@react-navigation/drawer"

import { RootNavigatorParams } from "./RootNavigator"
import { TabNavigatorParams } from "./tab"


export type ScreenProps<P, K extends keyof P> = CompositeScreenProps<
  // @ts-ignore
  RNStackScreenProps<P, K>,
  CompositeScreenProps<
    RNBottomTabScreenProps<TabNavigatorParams>,
    RNDrawerScreenProps<RootNavigatorParams>
  >
>
