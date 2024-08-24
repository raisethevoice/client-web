import { Col, Row } from 'antd';
import Footer from 'components/Footer';
import TrendingPosts from 'components/TrendingPosts';
import Feed from 'pages/feed/views/Feed';

export default function ExplorePage() {
  return (
    <Row gutter={[40, 0]}>
      <Col span={18} className="col-span-4">
        {/* <ExploreCardRow /> */}
        <div className="">
          <Feed />
        </div>
      </Col>
      <Col span={6} className="col-span-2">
        <div className="flex flex-col gap-5 sticky top-[88px]">
          <TrendingPosts />
          <Footer />
        </div>
      </Col>
    </Row>
  );
}

// const ExploreCardRow = () => {
//   const EXPLORE_ITEMS = [
//     { label: 'Human Rights' },
//     { label: 'Corruption' },
//     { label: 'Mental Health Awareness' },
//     { label: 'Climate Change' },
//     { label: 'Education' },
//     { label: 'Digital Privacy' },
//     { label: 'Youth Empowerment' },
//     { label: 'Community Initiatives' },
//     { label: 'Economic Inequality' },
//     { label: 'Media Literacy' },
//   ];

//   return (
//     <div className="flex flex-wrap items-center gap-1.5 pb-4">
//       {EXPLORE_ITEMS.map((item) => (
//         <div
//           key={item.label}
//           className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 py-[5px] px-3 font-medium"
//         >
//           {item.label}
//         </div>
//       ))}
//     </div>
//   );
// };
