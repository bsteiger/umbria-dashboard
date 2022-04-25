import { useParams } from "react-router-dom";
type ProfileParams = { address: string };
export default function Profile() {
  const { address } = useParams() as ProfileParams;
  return <div>Profile for {address}</div>;
}
