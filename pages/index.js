import Head from 'next/head'
import { useState } from "react"
import Image from 'next/image'

function Header(props) {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <Image src="/favicon.ico" width="30" height="30" className="d-inline-block" alt="icon" />
          <span className="pl-3 pr-3">{props.header}<span className="badge badge-success">Beta</span></span>
        </a>
      </nav>
    </div>
  )
}

function Footer(props) {
  return (
    <div>
      <footer className="footer bg-light">
        <p className="text-center text-muted p-3">{props.footer}</p>
      </footer>
    </div>
  )
}

function Layout(props) {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@butanokeiton" />
        <meta name="twitter:creator" content="@butanokeiton" />
        <meta property="og:url" content="https://js-calc-for-vercel.vercel.app/" />
        <meta property="og:title" content="JavaScript Calculator v0.0.1" />
        <meta property="og:description" content="JavaScriptでコードを書くように計算式を実行できます。" />
        <meta property="og:image" content="https://raw.githubusercontent.com/penguinspizza/js-calc-for-vercel/main/public/favicon.ico" />
        <meta name="description" content="JavaScriptでコードを書くように計算式を実行できます。" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"></link>
      </Head>
      <Header header={props.header} />
      <div className="container">
        {props.children}
      </div>
      <Footer footer={props.footer} />
    </div>
  )
}

function Calc(props) {
  const [formula, setFormula] = useState("")
  let defaultRows = 1
  const [rows, setRows] = useState(defaultRows)
  let result = ""
  let message = ""
  let showType = ""

  const doChange = (e) => {
    setFormula(e.target.value)
  }

  const changeRow = (e) => {
    setRows(e.target.value)
  }

  const selected = (value, key) => {
    if (value == defaultRows) {
      return <option key={key} defaultValue>{value}</option>
    } else {
      return <option key={key}>{value}</option>
    }
  }

  try {
    let value = eval(formula)
    if (value == undefined) {
      result = "何も値が返されません"
      message = "入力エリアの最後に出力する変数または式を記述してください"
      showType = "warning"
    } else {
      result = value
      message = "正常に出力されました"
      showType = "primary"
    }
  } catch (e) {
    result = "エラーです"
    message = e.message
    showType = "danger"
  }

  let showCardBorderClass = "card border-" + showType + " mb-3"
  let showCardBodyClass = "card-body text-" + showType

  return (
    <div>
      <form>
        <div className="form-group">
          <div className="input-group mt-3 mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text">入力エリアの表示行数</span>
            </div>
            <select className="form-control" id="Select1" onChange={changeRow}>
              {[...Array(100)].map((_, i) => i + 1).map((value, key) => selected(value, key))}
            </select>
            <div className="input-group-append">
              <span className="input-group-text">行</span>
            </div>
          </div>
          <textarea className="form-control" id="textArea1" placeholder="JavaScript入力エリア" rows={rows} onChange={doChange}></textarea>
        </div>
      </form>

      <div className={showCardBorderClass}>
        <div className="card-header">出力</div>
        <div className={showCardBodyClass}>
          <h5 className="card-title">{result}</h5>
          <p className="card-text">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <Layout header="JavaScript Calculator v0.0.0" title="js-calc" footer="&copy; penguinspizza.">
        <Calc />
      </Layout>
    </div>
  )
}
