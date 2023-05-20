import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize:8,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number
  }

   capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
    super(props);
    console.log("Hello i am constructor from news component ");
    this.state={
       articles:[],
       loading:true,
       page:1,
       totalResults:0

    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }

  async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b62f1cb5975a40d086a8c6394b36ae8d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData =await data.json();
    //this.setState({loading:true})
    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false,
    })

  }

  async componentDidMount(){
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b62f1cb5975a40d086a8c6394b36ae8d&page=1&pageSize=${this.props.pageSize}`;
    // let data=await fetch(url);
    // let parsedData =await data.json();
    // this.setState({loading:true})
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults:parsedData.totalResults,
    //   loading:false
    // })

    this.updateNews();
  }

   handlePreviousClick=async ()=>{
  //   // console.log("previous");
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b62f1cb5975a40d086a8c6394b36ae8d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // let data=await fetch(url);
  //   // let parsedData =await data.json();
  //   // this.setState({loading:true})
  //   // this.setState({
  //   //   page:this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading:false
  //   // })
    this.setState({page:this.state.page - 1});
    this.updateNews();

  }


   handleNextClick= async ()=>{
    console.log("Next");
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    // {
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b62f1cb5975a40d086a8c6394b36ae8d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true})
      // let data=await fetch(url);
      // let parsedData =await data.json();
      // this.setState({
      //   page:this.state.page + 1,
      //   articles: parsedData.articles,
      //   loading:false
      // })
      this.setState({page:this.state.page + 1});
      this.updateNews();
    }
    


  fetchMoreData = async () => {
    this.setState({page:this.state.page + 1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b62f1cb5975a40d086a8c6394b36ae8d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData =await data.json();
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults
    })
     };

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px'}}>NewsMonkey - Top <strong>{this.capitalizeFirstLetter(this.props.category)} Category </strong>  Headlines </h1>


        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >


        <div className="container">
        <div className="row">
          {/* {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):""}  description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage}
            newsUrl= {element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          // })} */} 
          {/* page wise divison page above 1,2,3,4.... */}
          {/* Infinite Scroll down  */}

           { this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):""}  description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage}
            newsUrl= {element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            })}
             
        </div>
        </div>
        </InfiniteScroll>
        
        
        
        {/* previous next buttons down  */}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}


      </>
    )
  }
}

export default News