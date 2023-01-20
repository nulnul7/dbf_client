import React, { Component } from 'react';
import defaultImages from '../assets/defaultImages.jpeg';
import DisplayImage from '../components/DisplayImage';
import Loading from '../components/Loading';
import PortfNameHero from '../components/PortfNameHero';
import TypeHero from '../components/TypeHero';
import { Context } from '../context';
// import PortfolioRendered from './PortfolioRendered';

class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            setActive:[],
            setStart:true,
            setImageStart:true,
            setStatus:0,
            imageShow:[],
            portfData:[]
        }
    }

    static contextType = Context;

    showPreview = (images) => {
        this.setState({imageShow: `http://localhost:5000/${images}`, setImageStart: false})
    }

    render() {
        const {portfolios, webPortfolio, gdPortfolio, fotoPortfolio, loading, getItemPortfolio} = this.context

        const getPortfolio = (e) => {
            this.setState({setStart:false, setStatus:e});
            if (e === 0) {this.setState({setActive:gdPortfolio, })
            } else if (e === 1) {this.setState({setActive:fotoPortfolio})}
                else if (e === 2) {this.setState({setActive:webPortfolio})}
        }

        const uniqueTypes = [...new Set(portfolios.map(item => item.category))].sort();


        const PortfolioName = (item, index) => {
            return (
                <PortfNameHero 
                    pname={item.title} 
                    key={index} 
                    slug={item.slug}
                    getPortfolioDetail={() => getItemPortfolio(item.category, index)}
                    overData={()=>this.showPreview(item.images)}
                />
                )
        }

        const defaultPortfolio = gdPortfolio.map((item, index) => PortfolioName(item, index))
        const listPortfolio = this.state.setActive.map((item, index) => PortfolioName(item, index))

        return (
            loading ? <Loading /> : 
            <div className='portfContainer'>

                {/* pilihan category */}
                <div className='portfType'>
                    {
                        uniqueTypes.map((typos, index) => {
                            return (
                                <TypeHero 
                                    ptype={typos} 
                                    key={index} 
                                    getType={()=>getPortfolio(index)} 
                                    dudul={index === this.state.setStatus ? 'activeLink' : null}
                                />
                            )
                        })
                    }
                </div>

                {/* list nama portfolio */}
                <div className='portfName'>
                    {
                        this.state.setStart ? defaultPortfolio : listPortfolio
                    }
                </div>

                {/* Display image portfolio */}
                <div className='portfDisplay'>
                    <div className='linePortfolio'></div>
                {
                    this.state.setImageStart ? <DisplayImage images={ defaultImages }/> : <DisplayImage images={ this.state.imageShow }/>
                }
                </div>
            </div>
        )
    }
}



export default Portfolio;
