module.exports =  {
	"is_out": '', //淘汰赛页面关注这个字段即可,是否1/8决赛后是否答错过题 0 否,没被淘汰 1 是,被淘汰
	"data": [
		{ 
			"team_id1":1,
			"team_name1":"巴西",
			"team_url1":'',
			"team_id2":11,
			"team_name2":"中国",
			"team_url2":'',
			"item_id":'0',//题目id
			"item_describe":'',//题目描诉	
			"ban_time":'',
			"group_id": 'A', 
			"player_answer_id":1, 
			"answerlist":[
				{
					"answer_id":1,
					"answe_describe":"胜利",
					"odd" : '2.02', //赔率
					"is_correct":1  //--1表示正确答案, 0表示错误答案
				},
				{
					"answer_id":2,
					"answe_describe":"平局",
					"odd" : '4.8', //赔率,
					"is_correct":0, //--1表示正确答案, 0表示错误答案
				},
				{
					"answer_id":3,
					"answe_describe":'胜利',
					"odd" :"3.2" ,//赔率
					"is_correct":0, //--1表示正确答案, 0表示错误答案
				}
			]
				
		},
		{
		    "team_id1":1,
			"team_name1":"俄罗斯",
			"team_url1":'',
			"team_id2":11,
			"team_name2":"埃及",
			"team_url2":'',
			"item_id":'1',//题目id
			"item_describe":'',//题目描诉	
			"ban_time":'',
			"group_id": 'A', 
			"player_answer_id":1, 
			"answerlist":[
				{
					"answer_id":1,
					"answe_describe":'胜利',
					"odd" : '2.02', //赔率
					"is_correct":0  //--1表示正确答案, 0表示错误答案
				},
				{
					"answer_id":2,
					"answe_describe":'平均',
					"odd" : '4.8', //赔率,
					"is_correct":0 //--1表示正确答案, 0表示错误答案
				},
				{
					"answer_id":3,
					"answe_describe":'胜利',
					"odd" :"3.2" ,//赔率
					"is_correct":1, //--1表示正确答案, 0表示错误答案
				}
			]
		}		
	],
	"msg":"",
	"ret":0
}