import { useEffect, useState } from 'react';
import { Button, Avatar, notification } from 'antd';
import { history } from 'umi';
import QRCode from 'qrcode.react';

import styles from './WorksDownload.less';
import { getAuthor, getMarkets } from '@/services/auction';
import { randomString } from '@/utils/common';
import { searchQrCodeInfo } from '@/services';
import { useInterval } from 'ahooks';
import { downloadFile } from '@/services/download';

const randomKeys = randomString(19);
const WorksDownload = () => {
  const { workId, assetId, num } = (history.location
    .query as unknown) as API.QueryProps;
  const [loading, setLoading] = useState(false);

  const [markets, setMarkets] = useState<API.MarketsType | null>(null);
  const [interval, setInterval] = useState<any>(1000);
  const [info, setInfo] = useState<any>(null);

  const fetchMarkets = async () => {
    try {
      const result = await getMarkets(workId);
      if (result.data?.id) {
        setMarkets(result.data);
      }
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      const result = await searchQrCodeInfo(randomKeys);
      if (result.data) {
        setInterval(null);
        setInfo(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownLoadFile = async () => {
    try {
      const data = {
        method: 'get',
        params: { assetId: assetId },
        headers: { 'x-sender': info.xSender },
      };
      const result = await downloadFile(data);
      if (result.data && typeof result.data === 'string') {
        window.open((result.data as unknown) as string);
      } else {
        if (result.data.code) {
          notification.error({
            message: '错误',
            description: result.data.message,
          });
        } else {
          notification.error({
            message: '错误',
            description: JSON.stringify(result.data),
          });
        }
      }
    } catch (error) {}
    // setLoading(true);
    // downloadFile({
    //   method: 'GET',
    //   params: { assetId: assetId },
    //   headers: { 'x-sender': info.xSender },
    //   responseType: 'blob',
    // }).then((res: any) => {
    //   setLoading(false);
    //   try {
    //     const type = res.data.type;
    //     let index = type.lastIndexOf('/');
    //     const str = type.substring(index + 1, type.length);
    //     const blob = new Blob([res.data]);
    //     const objectURL = URL.createObjectURL(blob);
    //     let btn = document.createElement('a');
    //     btn.download = new Date().getTime() + `.${str}`;
    //     btn.href = objectURL;
    //     btn.click();
    //     URL.revokeObjectURL(objectURL);
    //   } catch (error) {
    //     notification.error({
    //       message: '通知',
    //       description: '下载失败，请稍后重试',
    //     });
    //   }
    // });
  };

  const subStringContract = (contractAddress: string) => {
    const _contract = [];
    let start = 0;
    let end = 2;
    let count = 0;

    return (function _startWhile() {
      if (count !== 0) {
        start = end;
        end += 4;
      }
      _contract.push(contractAddress.substring(start, end));
      count++;
      if (count <= 10) {
        _startWhile();
      }
      return _contract;
    })();
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  useInterval(
    () => {
      fetchData();
    },
    interval,
    { immediate: true },
  );

  useEffect(() => {
    const compact = (n: any, m: any) => {
      if (n.price === m.price) {
        return n.time - m.time;
      } else {
        return n.price - m.price;
      }
    };
  }, []);

  const handlePurchaseAgreement = () => {
    window.open(markets?.purchaseAgreement || '');
  };

  return (
    <div className={styles.container}>
      <header>
        <img src={require('@/images/footer-logo.png')} alt="logo.png" />
      </header>
      <section>
        <div className={styles.sectionLeft}>
          <div className={styles.worksImg}>
            <img src={markets?.image} alt="img" />
          </div>
        </div>
        <div className={styles.sectionRight}>
          <div className={styles.product}>
            <div className={styles.name}>{markets?.name}</div>
            <div
              className={styles.purchaseAgreement}
              onClick={handlePurchaseAgreement}
            >
              用户购买权限说明
            </div>
            <div className={styles.productDetails}>
              <div className={styles.label}>合约地址</div>
              <div className={styles.value}>{markets?.contractaddress}</div>
            </div>
            <div className={styles.productDetails}>
              <div className={styles.label}>作品代码</div>
              <span className={styles.value}>{markets?.code}</span>
            </div>
            <div className={styles.productDetails}>
              <div className={styles.label}>总发行量</div>
              <span className={styles.value}>{markets?.copies}份</span>
            </div>
          </div>
          {!info ? (
            <div className={styles.qrCodeWrap}>
              <QRCode
                id="qrcode"
                value={`UMedia://login?key=${randomKeys}`}
                renderAs={'svg'}
                size={140}
                style={{ marginTop: 20 }}
                level={'H'}
              />
              <div className={styles.tips}>
                <p style={{ fontWeight: 600 }}>
                  请用公众号中“我的”里面的“扫一扫”功能扫此二维码
                </p>
                <p>即可下载作品源文件</p>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.userInfo}>
                <Avatar src={info?.headImage} className={styles.avatar} />
                <div className={styles.avatarName}>{info?.name}</div>
              </div>
              <Button
                disabled={loading}
                type="primary"
                loading={loading}
                className={styles.btn}
                onClick={handleDownLoadFile}
              >
                <span style={{ marginRight: 60 }}>
                  作品序列号{markets?.code}
                  {num && `-${num}`}
                </span>
                <span>
                  下载作品源文件
                  {markets?.size ? `(${markets?.size / 1024}MB)` : null}
                </span>
              </Button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default WorksDownload;
