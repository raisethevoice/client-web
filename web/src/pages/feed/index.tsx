import { Col, Row } from 'antd';
import Footer from 'components/Footer';
import TrendingTags from 'components/TrendingTags';
import Feed from './views/Feed';
import FollowSuggestion from 'components/FollowSuggestion';

export default function FeedPage() {
  return (
    <Row gutter={[40, 0]}>
      <Col span={18} className="col-span-4">
        <Feed />
      </Col>
      <Col span={6} className="col-span-2">
        <div className="sticky top-[88px] flex flex-col gap-5">
          <TrendingTags />
          <FollowSuggestion />
          <Footer />
        </div>
      </Col>
    </Row>
  );
}
