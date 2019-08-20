import Pagination from "react-bootstrap/Pagination"

class PaginationBasic extends React.Component {

  render() {
    let items = [];
    let pageSize = this.props.pageSize;
    let pages = Math.ceil(this.props.size/pageSize);
    let ellipsis = pages > 10;
    let ellipsisBackDone = false;
    let ellipsisFrontDone = false;
    for (let page = 1; page <= pages; page++){
      if(page<(this.props.active-4)&& ellipsis && !ellipsisBackDone ){
        items.push(
            <Pagination.Ellipsis key={"back-ellipsis"}/>
        );
        ellipsisBackDone = true;
      }
      if(page>(this.props.active+5)&& ellipsis && !ellipsisFrontDone ){
        items.push(
            <Pagination.Ellipsis key={"front-ellipsis"} />
        );
        ellipsisFrontDone = true;
      }
      if(!ellipsis || (page>=(this.props.active-2) && page<=(this.props.active+4))){
        items.push(
            <Pagination.Item key={page}
                             active={page === (this.props.active + 1)} onClick={page === (this.props.active + 1) ? null : this.props.updateState}>
              {page}
            </Pagination.Item>
        );
      }
    }
    return <div>
      <Pagination >
        <Pagination.First onClick={this.props.firstPage}/>
        <Pagination.Prev onClick={this.props.previousPage}/>
        {items}
        <Pagination.Next onClick={this.props.nextPage}/>
        <Pagination.Last onClick={this.props.lastPage}/>
      </Pagination>
      </div>
  }
}

export default PaginationBasic