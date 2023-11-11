import { useParams } from 'react-router-dom';
import ManageCommunity from '../components/manageCommunityComponents/ManageCommunity';

const ManageCommunityFinal: React.FunctionComponent = () => {
  const { searchValueCommunity } = useParams();
  const communityValue = searchValueCommunity ?? '';
  return (
    <div className="cm-content">
      <h1>Here you can manage your community</h1>
      <div className="cm-content-child">
        <ManageCommunity searchValue={communityValue} />
      </div>
    </div>
  );
}
export default ManageCommunityFinal;
