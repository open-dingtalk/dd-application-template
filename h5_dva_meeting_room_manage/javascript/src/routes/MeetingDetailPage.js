import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'dva';
import setTitleDD from 'dingtalk-jsapi/api/biz/navigation/setTitle';
import { InputItem, Form, Button } from 'dingtalk-design-mobile';
import './MeetingDetailPage.css';

const { Item } = Form;

function MeetingDetailPage(props) {
	const { dispatch, meetings, match, history } = props;

	const [meeting, setMeeting] = useState({});
	const [id, setId] = useState(null);

	useEffect(() => {
    const { id } = match.params;

		if (id) {
			const current = meetings.filter(i => String(i.id) === id)[0];
			if (current) {
				setMeeting(current);
			}
			setId(id);
			setTitleDD({
				title: '编辑会议室',
			});
			return;
		}
		setTitleDD({
			title: '新增会议室',
		});
	}, []);

	const confirm = useCallback(() => {
    const { id } = match.params;
    const params = {
      id,
      address: meeting.address,
      name: meeting.name,
      num: meeting.num
    };
		dispatch({
			type: 'app/updateRoom',
			payload: params,
			callback: () => {
				history.push(`/manage`);
			}
		});
  }, [match.url]);

  return (
    <div className="meetingDetail">
      <div className="form">
        <Form onValuesChange={console.log}>
			<Form.Group renderHeader="会议室信息">
				<Item label="名称" rules={[{ required: true, message: '请输入会议室名称' }]}>
					<InputItem
						onChange={v => {
							setMeeting({
								...meeting,
								name: v,
							});
						}}
						value={meeting.name}
						placeholder="请输入会议室名称"
					/>
				</Item>
				<Item label="人数" rules={[{ required: true, message: '请输入数字' }]}>
					<InputItem
						onChange={v => {
							setMeeting({
								...meeting,
								num: v,
							});
						}}
						value={meeting.num}
						placeholder="请输入数字"
					/>
				</Item>
				<Item label="地址" rules={[{ required: true, message: '请输入会议室地址' }]}>
					<InputItem
						onChange={v => {
							setMeeting({
								...meeting,
								address: v,
							});
						}}
						value={meeting.address}
						placeholder="请输入会议室地址"
					/>
				</Item>
			</Form.Group>
		</Form>
      </div>
      <div className="primaryBtn">
        <Button onClick={confirm} type="primary">确认</Button>
      </div>
    </div>
  );
}

MeetingDetailPage.propTypes = {
};

export default connect((state) => {
  return {
    meetings: state.app.meetings,
  };
})(MeetingDetailPage);
