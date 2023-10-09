import { useLinkTo, useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'

export function useUserProfileRoute() {
  const navigation = useNavigation()
  const linkTo = useLinkTo()

  const goTo = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('user-nested', {
      screen: 'profile',
    })
  }, [navigation])

  const goEditScreen = () => {
    linkTo('/user-nested/edit-profile')
  }

  const goEditUsernameScreen = () => {
    linkTo('/user-nested/edit-username')
  }

  const goSettingsScreen = () => {
    linkTo('/user-nested/settings')
  }

  const goAboutScreen = () => {
    linkTo('/user-nested/about')
  }

  const goCommentScreen = () => {
    linkTo('/user-nested/comments')
  }

  const goDraftScreen = () => {
    linkTo('/user-nested/draft')
  }

  // space
  const goSchoolCourseScreen = useCallback(() => {
    linkTo('/space-nested/school-course')
  }, [linkTo])

  const goSchoolCalendarScreen = useCallback(() => {
    linkTo('/space-nested/school-calendar')
  }, [linkTo])

  return {
    goTo,
    goEditScreen,
    goEditUsernameScreen,
    goSettingsScreen,
    goAboutScreen,
    goCommentScreen,
    goDraftScreen,
    goSchoolCourseScreen,
    goSchoolCalendarScreen,
  }
}
