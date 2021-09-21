import React from "react"
import ExtensionsHeader from "../extensions/extensionsHeader"
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  CardHeader,
  CardTitle,
  Input
} from "reactstrap"
import { history } from "../history"
import { UploadCloud, Search } from "react-feather"
import { useDropzone } from "react-dropzone"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../assets/scss/plugins/extensions/toastr.scss"
import "../assets/scss/plugins/extensions/dropzone.scss"
import {Spinner} from "reactstrap"
import {analyzeData} from '../redux/services/auth_curd'

const successNotification = (message) => toast.success(message)
const errorNotification = (message) => toast.error(message)
 

function Uploader(props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".json",
    onDrop: acceptedFiles => {
      props.getRawData(acceptedFiles[0])
      if (!acceptedFiles.length) {
        toast.error("You can only upload .json Files!")
      }
    }
  })

  return (
    <section className="pb-1">
      <div {...getRootProps({ className: "dropzone py-3 flex-column" })}>
        <input {...getInputProps()} />
        <UploadCloud className="text-light" size={50} />
        <h4 className="mb-0 mt-2">Drop JSON File or Browse</h4>
      </div>
    </section>
  )
}

class FileUpload extends React.Component {
  state = {
    raw_file: null,
    loading:false
  }

  getRawData = (file) => {
    console.log(file)
    this.setState({ raw_file: file })
  }

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onFileUpload = () => { 
    this.setState({'loading':true})
    let formData = new FormData();
    formData.append( 
        "raw_file", 
        this.state.raw_file, 
        this.state.raw_file.name 
    );
    
    analyzeData(formData)
    .then((response) => {
        successNotification(response.data.message)
        setTimeout(function() { history.push({pathname: "/results", result:response.data.result}) }.bind(this), 3000);
    }, (error) => {
          if (error.response){
            errorNotification(error.response.data.message)
          }else{
            errorNotification('server in under maintanance')
          }
          this.setState({'loading':false})
          this.setState({raw_file: null})
      });      
    }; 

  render() {

    return (
      <React.Fragment>
        <ToastContainer autoClose={3000} pauseOnHover draggable closeOnClick/>
        <ExtensionsHeader
          title="Upload betting data in json format."
          // subTitle="Xlsx is a parser and writer for various spreadsheet formats"
          // link="https://github.com/AdeleD/react-paginate"
        />
        <Row className="import-component">
          <Col sm="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <Uploader getRawData={this.getRawData} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          {this.state.raw_file ? (
            <Col sm="12">
              <Card>
                <CardBody>
                  <Row style={{alignItems:"center"}}>
                    <Col sm="4" className="py-1">
                      <h3>{this.state.raw_file.name}</h3>
                    </Col>
                    <Col sm="4" className="py-1">
                      <h3>{this.formatBytes(this.state.raw_file.size)}</h3>
                    </Col>
                    <Col sm="4" className="py-1">
                      {this.state.loading ? 
                      <>
                      <Spinner type="grow" color="primary" />
                      <Spinner type="grow" color="success" />
                      <Spinner type="grow" color="info" />
                      <Spinner type="grow" color="danger" />
                      <Spinner type="grow" color="warning" />
                      <Spinner type="grow" color="light" />
                      <Spinner type="grow" color="dark" /> 
                      </> :
                      <button onClick={() => this.onFileUpload()} style={{border: "none", background: "#ff0000", color: "white", borderRadius: "50%", padding: "12px"}}> Analyze </button>
                      }
                      
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          ) : null}
        </Row>
      </React.Fragment>
    )
  }
}

export default FileUpload
