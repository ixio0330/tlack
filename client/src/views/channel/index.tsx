import { useParams } from "react-router-dom"

export default function ChannelView() {
  const { channel_id } = useParams();
  return (
    <div>
      {channel_id}
    </div>
  )
}