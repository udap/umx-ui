import { history } from 'umi';

import styles from './WorksDownload.less';

const WorksDownload = () => {
  const { workId, assetId } = (history.location
    .query as unknown) as API.QueryProps;

  console.log(workId, assetId);

  return (
    <div>
      作品下载
      <div>
        workId: {workId}, assetId: {assetId}
      </div>
    </div>
  );
};

export default WorksDownload;
