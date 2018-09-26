import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { Card, Table } from "antd";
const { Content } = Layout;

function buildColumns(cols) {
  return cols.map(x => {
    return {
      title: x.header,
      dataIndex: x.field,
      className: "column-money"
    };
  });
}

const FooterReport = props => {
  return (
    <tbody className="footer-body nohover" {...props}>
      <React.Fragment>
        {props.children}
        <tr className="footer-body">
          {props.children[0].props.columns.map((x) => {
            return (            
              <td key={x.dataIndex}>
              {console.dir(x.dataIndex)}
                {x.dataIndex  !== 'name' &&
                  props.children[0].props.data.reduce((sum, i) => sum + i[x.dataIndex], 0)
                }
                {x.dataIndex === 'name' &&
                  <span>Resume</span>
                }

              </td>
            )
          })}
        </tr>
      </React.Fragment>
    </tbody>
  );
};

function BuildReport({ reportHeader, reportColumns, dataSet, exportDataSet }) {
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
              components={{ body: { wrapper: FooterReport, cols, dataSet } }}
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
          reportColumns={[
            { header: "Col name", field: "name" },
            { header: "Values of Y", field: "y" },
            { header: "Values of T", field: "t" },
            { header: "Values of N", field: 'n' }
          ]}
          dataSet={[
            { name: "Y", y: 1, t: 2, n: 4, key: "1" },
            { name: "T", y: 2, t: 4, n: 0, key: "2" },
            { name: "N", y: 3, t: 6, n: 2, key: "3" }
          ]}
          exportDataSet={true}
        />
      </div>
    );
  }
}

export default App;
