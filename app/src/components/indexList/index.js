import React from 'react';
import {Link} from 'react-router';
import '../../static/css/style.css';
import {dateDiff} from '../../Tools';
import {UserModel,ArticleModel} from '../../../data/dataModel';

let Styles = {
    indexList:{
        paddingRight:'0.75rem',
        marginBottom:'0.2rem',
        borderTop:'1px solid #dfdfdf',
        borderBottom:'1px solid #dfdfdf',
        background:"#fff",
        paddingLeft:"0.75rem",
        paddingBottom:"0.3rem"
    },
    h4Style:{
        margin:"0.3rem 0",
        color:'#259',
        fontSize:'16px'
    },
    pStyle:{
        margin:"0.3rem 0",
        fontSize:"15px"
    },
    listBlock:{
        margin:0
    },
    userTitle:{
        display:'inline-block'
    }
};
export default class IndexList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[],
            defaultTop:null
        }
    }
    componentDidMount(){
        this.fetchData();
    }
    //获取数据
    fetchData(){
        ArticleModel.fetchList('',(data)=>{
            this.setState({
                list:data
            });
        },(err)=>{
            console.log(err);
        });
    }
    //列表
    indexList(){
        var list=this.state.list;
        var _this=this;
        return list.map((item,index)=>(
            <li style={Styles.indexList} key={item._id}>
                <Link to={`/indexList/${item._id}`} style={{display:'block'}}>
                    <div className="list">
                        <div style={{paddingTop:'0.4rem'}}>
                            <div style={{display:'inline-block',verticalAlign:'top',height:'2rem'}}>
                                {/*  出现问题，暂时有背景替代
                                 <img src={item.user.avatar} alt="" style={{marginRight:'0.3rem',height:'1.7rem',display:'inline-block'}}/>
                                 */}
                                <div  style={{backgroundImage:'url('+`${item.user.avatar}`+')',backgroundSize:'100% 100%',width:'1.7rem',height:'1.7rem',marginRight:'0.3rem'}}></div>
                            </div>
                            <div style={{display:'inline-block',verticalAlign:'top',height:'2rem'}}>
                                <div style={{fontSize:'14px',fontWeight:600}}>{item.user.username}</div>
                                <div style={{fontSize:'12px'}}><span className="icon icon-clock"> </span> {dateDiff(item.createAt)}</div>
                            </div>
                        </div>
                        <div className=""><h4 style={Styles.h4Style}>{item.title}</h4></div>
                        <div className=""><p style={Styles.pStyle}>{item.content}</p></div>
                    </div>
                </Link>
                <div style={{display:'block',width:'100%',fontSize:'14px'}}>
                    <span className="icon icon-star"style={this.starStyle(item.star)} onClick={(e)=>{_this.giveStar(e)}}  data-articleId={item._id}> {item.star.length}</span>
                    <span className="icon icon-message"> {item.commentNum}</span>
                </div>
            </li>
        ))
    }

    //点赞
    giveStar(e){
        let userToken = UserModel.fetchToken();
        if(!userToken){
            $.toast('您还没有登录');
            return;
        }
        let thisSpan = e.nativeEvent.target;
        let articleId = thisSpan.getAttribute('data-articleid');
        let params = {
            userId : userToken,
            articleId :articleId
        };
        ArticleModel.giveStar(params,(data)=>{
            if(data.title){
                thisSpan.style.color = 'red';
                $.toast(data.content);
                this.componentDidMount()
            }else{
                thisSpan.style.color = 'none';
                $.toast(data.content);
                this.componentDidMount()
            }
        },(err)=>{
            console.log(err)
        })
    }
    //设置点赞星样式
    starStyle(startlist){
        let userToken=UserModel.fetchToken();
        for(let i=0;i<startlist.length;i++){
            let cur=startlist[i];
            if(cur== userToken){
                return  {marginRight:'0.5rem',paddingLeft:'0.3rem',color:'red'};
            }
        }
        return {marginRight:'0.5rem',paddingLeft:'0.3rem'}
    }

    //限制字数
    wordControl(word){
        if(word.length>65){
            word=word.substring(0,65)+'...';
        }
        return word;
    }
    render(){
        return (
            <main>
                <div className=" outerScroller" id="outerScroller" ref="outerScroller">
                    <div className="pullToRefreshBox" id="pullToRefreshBox" ref="pullToRefreshBox">
                        <div className="preloader" id="" ref="preloader"></div>
                        <div className="pullToRefreshArrow" id="" ref="pullToRefreshArrow"></div>
                    </div>
                    <ul style={{background:"#eee"}} className="scroll" ref="scrollList">
                        {this.indexList()}
                    </ul>
                </div>
            </main>
        )
    }
}