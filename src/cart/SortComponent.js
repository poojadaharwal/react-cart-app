import React, { Component } from 'react'

export default class SortComponent extends Component {
   
    render() {
        return (
            <div className="sort-container">
                <div className="row">
                    <div className="col-2">
                    <span ><b>Sort By</b></span>
                    </div>
                    <div className="col-3 sort-options" onClick={e=>this.props.sortItems("lh",e)}>
                     Price -- Low High
                    </div>
                    <div className="col-3 sort-options" onClick={e=>this.props.sortItems("hl",e)}>
                     Price -- High Low
                    </div>
                    <div className="col-2 sort-options" onClick={e=>this.props.sortItems("d",e)}>
                     Discount
                    </div>
                </div>
               
                
            </div>
        )
    }
}
