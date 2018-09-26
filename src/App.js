import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import {Layout} from "antd";
import "antd/dist/antd.css";
import {Card, Table} from "antd";
const {Content} = Layout;

function buildColumns(cols) {
  return cols.map(x => {
    return {
      title: x.header,
      dataIndex: x.field,
      className: "column-money"
    };
  });
}

function ReportFooter({cols, data}) {
  return cols.map(x => {
    return (
      <React.Fragment>
      <td key={x.dataIndex}>
        {data.reduce((sum, i) => sum + i[x.dataIndex], 0)}
      </td>
      </React.Fragment>
    );
  });
}

function BuildReport({reportHeader, reportColumns, dataSet, exportDataSet}) {
  const cols = buildColumns(reportColumns);

  return (
    <div className="centerDiv">
      <Layout>
        <Content>
          <Card
            title={reportHeader}
            bordered={true}
            extra={<a href="#">More</a>}
          >
            <Table
              columns={cols}
              dataSource={dataSet}
              bordered
              title={() => "Header"}
              footer={() => (
                <tr className="ant-table-row">
                  <ReportFooter cols={cols} data={dataSet} />
                </tr>
              )}
            />
          </Card>
        </Content>
      </Layout>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <BuildReport
          reportHeader={"sample"}
          reportColumns={[{header: "x", field: "y"}, {header: "p", field: "t"}]}
          dataSet={[
            {y: 1, t: 2, key: "1"},
            {y: 2, t: 4, key: "2"},
            {y: 3, t: 6, key: "3"}
          ]}
          exportDataSet={true}
        />
      </div>
    );
  }
}

export default App;
