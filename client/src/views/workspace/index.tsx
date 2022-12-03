import { useParams } from 'react-router-dom';

export default function WorkspaceView() {
  const { id } = useParams();
  return (
    <div>
      {id}
    </div>
  )
}