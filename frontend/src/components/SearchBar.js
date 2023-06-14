import React from 'react';
import {history} from '../utils/history';
import { Icon, Button, Input, AutoComplete} from 'antd';

const { Search } = Input;
// const { Option } = AutoComplete;

// function getRandomInt(max, min = 0) {
//     return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
// }

// function searchResult(query) {
//     return new Array(getRandomInt(5))
//         .join('.')
//         .split('.')
//         .map((item, idx) => ({
//             query,
//             category: `${query}${idx}`,
//             count: getRandomInt(200, 100),
//         }));
// }

// function renderOption(item) {
//     return (
//         <Option key={item.category} text={item.category}>
//             <div className="global-search-item">
//                 <span className="global-search-item-desc">
//                       Found {item.query} on
//                      <a
//                          href={`https://s.taobao.com/search?q=${item.query}`}
//                          target="_blank"
//                          rel="noopener noreferrer"
//                      >
//                          {item.category}
//                      </a>
//                 </span>
//                 <span className="global-search-item-count">{item.count} results</span>
//             </div>
//         </Option>
//     );
// }

export class SearchBar extends React.Component {

	onSearch = value => {
		console.log('Search: ' + value);
		if (value) {
			history.push('/search?name=' + value);
		}
	};

	render() {
		return (
			<div className="global-search-wrapper" style={{ width: 300 }}>
				<div direction="vertical" style={{width: 700}}>
					<Search
						placeholder="Search books by name"
						allowClear
						enterButton="Search"
						size="large"
						onSearch={this.onSearch}
					/>
				</div>
			</div>
		);
	}
}