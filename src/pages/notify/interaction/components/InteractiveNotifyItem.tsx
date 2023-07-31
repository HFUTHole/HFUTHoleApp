import { useNavigateToNotificationTarget } from '@/pages/notify/utils'
import { MessageListItem } from '@/components/MessageList/MessageListItem'

interface Props {
  data: INotifyInteractionListItem & { user?: IUser; creator?: IUser }
}

export function InteractiveNotifyItem({ data }: Props) {
  const { onNotificationPress } = useNavigateToNotificationTarget(data)

  return <MessageListItem data={data} onPress={onNotificationPress} />
}
