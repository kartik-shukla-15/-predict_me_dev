import React from "react"
import { Row, Col } from "reactstrap"
import StatisticsCard from "./ExtraComp/StatisticsCard"
import UserStatisticsCard from "./ExtraComp/UserStatisticsCard"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  CustomInput
} from "reactstrap"

import {
  Monitor,
  UserCheck,
  Mail,
  Eye,
  MessageSquare,
  ShoppingBag,
  Heart,
  Smile,
  Truck,
  Cpu,
  Server,
  Activity,
  AlertOctagon
} from "react-feather"

class Result extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      result:props.location.result,
      modalUser: false,
      select_user_option:[],
      user_selected_value : '',
      user_more_info:null,

      modalOdds: false,
      select_odds_option:[], 
      odds_selected_value:'', 
      odds_more_info:null,

      modalMarket: false,
      select_market_option:[], 
      market_selected_value:'', 
      market_more_info:null,

      modalMatch: false,
      select_match_option:[], 
      match_selected_value:'', 
      match_more_info:null,

      modalLeague: false,
      select_league_option:[], 
      league_selected_value:'', 
      league_more_info:null,

      modalSport: false,
      select_sport_option:[], 
      sport_selected_value:'', 
      sport_more_info:null,
    }
  }

  toggleModalUser = () => {
    this.setState(prevState => ({
      modalUser: !prevState.modalUser
    }))
  }

  toggleModalOdds = () => {
    this.setState(prevState => ({
      modalOdds: !prevState.modalOdds
    }))
  }

  toggleModalMarket = () => {
    this.setState(prevState => ({
      modalMarket: !prevState.modalMarket
    }))
  }

  toggleModalMatch = () => {
    this.setState(prevState => ({
      modalMatch: !prevState.modalMatch
    }))
  }

  toggleModalLeague = () => {
    this.setState(prevState => ({
      modalLeague: !prevState.modalLeague
    }))
  }

  toggleModalSport = () => {
    this.setState(prevState => ({
      modalSport: !prevState.modalSport
    }))
  }

  optionSetterUser = (select_user_option) => {
    this.setState({select_user_option:select_user_option, user_selected_value:'', user_more_info:null}, () => {
      this.toggleModalUser()
    })
  }

  optionSetterOdds = (select_odds_option) => {
    this.setState({select_odds_option:select_odds_option, odds_selected_value:'', odds_more_info:null}, () => {
      this.toggleModalOdds()
    })
  }

  optionSetterMarket = (select_market_option) => {
    this.setState({select_market_option:select_market_option, market_selected_value:'', market_more_info:null}, () => {
      this.toggleModalMarket()
    })
  }

  optionSetterMatch = (select_match_option) => {
    this.setState({select_match_option:select_match_option, match_selected_value:'', match_more_info:null}, () => {
      this.toggleModalMatch()
    })
  }

  optionSetterLeague = (select_league_option) => {
    this.setState({select_league_option:select_league_option, league_selected_value:'', league_more_info:null}, () => {
      this.toggleModalLeague()
    })
  }

  optionSetterSport = (select_sport_option) => {
    this.setState({select_sport_option:select_sport_option, sport_selected_value:'', sport_more_info:null}, () => {
      this.toggleModalSport()
    })
  }
  
  showUserInfo = (e) => {
    let value = e.target.value
    this.setState({user_selected_value:value})
    let user_more_info = this.state.result.all_user_info[value]
    this.setState({user_more_info:user_more_info})
  }

  showOddsInfo = (e) => {
    let value = e.target.value
    this.setState({odds_selected_value:value})
    let odds_more_info = this.state.result.all_odds_info[value]
    this.setState({odds_more_info:odds_more_info})
  }

  showMarketInfo = (e) => {
    let value = e.target.value
    this.setState({market_selected_value:value})
    let market_more_info = this.state.result.all_market_info[value]
    this.setState({market_more_info:market_more_info})
  }

  showMatchInfo = (e) => {
    let value = e.target.value
    this.setState({match_selected_value:value})
    let match_more_info = this.state.result.all_match_info[value]
    this.setState({match_more_info:match_more_info})
  }

  showLeagueInfo = (e) => {
    let value = e.target.value
    this.setState({league_selected_value:value})
    let league_more_info = this.state.result.all_league_info[value]
    this.setState({league_more_info:league_more_info})
  }

  showSportInfo = (e) => {
    let value = e.target.value
    this.setState({sport_selected_value:value})
    let sport_more_info = this.state.result.all_sport_info[value]
    this.setState({sport_more_info:sport_more_info})
  }
  
  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.modalUser}
          toggle={this.toggleModalUser}
          className="modal-dialog-centered modal-lg"
          >
          <ModalHeader toggle={this.toggleModalUser} className="bg-primary">
          User More Info
          </ModalHeader>
          <ModalBody>
          <Row className="my-1" style={{alignItems:'center', width:'50%'}}>
            <Col md="6" sm="6">
                <h5 className="text-bold-600">Select User ID :</h5>                  
            </Col>
            <Col md="6" sm="6">
                <CustomInput
                  type="select"
                  name="select"
                  id="exampleSelectCustom"
                  value={this.state.user_selected_value}
                  onChange={this.showUserInfo}
                >
                <option value='' >----select id----</option>
                {this.state.select_user_option.map((item, index) => {
                  return(
                    <option value={item} >{item}</option>
                  )
                })}
                </CustomInput>                
            </Col>
          </Row>
          {this.state.user_more_info ?
          <>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5>Name :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.user_more_info.first_name + ' ' + this.state.user_more_info.last_name}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5>Email :</h5>                  
            </Col>
            <Col md="6" sm="6">
              {this.state.user_more_info.email}     
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5>Phone :</h5>                  
            </Col>
            <Col md="6" sm="6">
              {this.state.user_more_info.phone}                
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5>created_at :</h5>                  
            </Col>
            <Col md="6" sm="6">
              {this.state.user_more_info.created_at}           
            </Col>
          </Row>
          </>:
          null
           }
          
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={this.toggleModalUser}>
              OK
              </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.modalOdds}
          toggle={this.toggleModalOdds}
          className="modal-dialog-centered modal-lg"
          >
          <ModalHeader toggle={this.toggleModalOdds} className="bg-primary">
          Odds More Info
          </ModalHeader>
          <ModalBody>
          <Row className="my-1" style={{alignItems:'center', width:'50%'}}>
            <Col md="6" sm="6">
                <h5 className="text-bold-600">Select Odd ID :</h5>                  
            </Col>
            <Col md="6" sm="6">
                <CustomInput
                  type="select"
                  name="select"
                  id="exampleSelectCustom"
                  value={this.state.odds_selected_value}
                  onChange={this.showOddsInfo}
                >
                <option value='' >----select id----</option>
                {this.state.select_odds_option.map((item, index) => {
                  return(
                    <option value={item} >{item}</option>
                  )
                })}
                </CustomInput>                
            </Col>
          </Row>
          {this.state.odds_more_info ?
          <>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5>odd type id :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.odds_more_info.odd_type_id}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5>match id :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.odds_more_info.match_id}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5>market type :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.odds_more_info.market_type}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5>display name :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.odds_more_info.display_name}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5>name :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.odds_more_info.name}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5>value :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.odds_more_info.value}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5>created_at :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.odds_more_info.created_at}              
            </Col>
          </Row>
          </>:
          null
           }
          
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={this.toggleModalOdds}>
              OK
              </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.modalMarket}
          toggle={this.toggleModalMarket}
          className="modal-dialog-centered modal-lg"
          >
          <ModalHeader toggle={this.toggleModalMarket} className="bg-primary">
          Market More Info
          </ModalHeader>
          <ModalBody>
          <Row className="my-1" style={{alignItems:'center', width:'50%'}}>
            <Col md="6" sm="6">
                <h5 className="text-bold-600">Select Market ID :</h5>                  
            </Col>
            <Col md="6" sm="6">
                <CustomInput
                  type="select"
                  name="select"
                  id="exampleSelectCustom"
                  value={this.state.market_selected_value}
                  onChange={this.showMarketInfo}
                >
                <option value='' >----select id----</option>
                {this.state.select_market_option.map((item, index) => {
                  return(
                    <option value={item} >{item}</option>
                  )
                })}
                </CustomInput>                
            </Col>
          </Row>
          {this.state.market_more_info ?
          <>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> Name :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.market_more_info.name}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> Market Type :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.market_more_info.market_type}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> Match ID :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.market_more_info.match_id}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> Created At :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.market_more_info.created_at}              
            </Col>
          </Row>
          </>:
          null
           }
          
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={this.toggleModalMarket}>
              OK
              </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.modalMatch}
          toggle={this.toggleModalMatch}
          className="modal-dialog-centered modal-lg"
          >
          <ModalHeader toggle={this.toggleModalMatch} className="bg-primary">
          Match More Info
          </ModalHeader>
          <ModalBody>
          <Row className="my-1" style={{alignItems:'center', width:'50%'}}>
            <Col md="6" sm="6">
                <h5 className="text-bold-600">Select Match ID :</h5>                  
            </Col>
            <Col md="6" sm="6">
                <CustomInput
                  type="select"
                  name="select"
                  id="exampleSelectCustom"
                  value={this.state.match_selected_value}
                  onChange={this.showMatchInfo}
                >
                <option value='' >----select id----</option>
                {this.state.select_match_option.map((item, index) => {
                  return(
                    <option value={item} >{item}</option>
                  )
                })}
                </CustomInput>                
            </Col>
          </Row>
          {this.state.match_more_info ?
          <>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> Match Name :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.match_more_info.name}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> Match Date/Time :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.match_more_info.match_date_time}
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> League ID :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.match_more_info.league_id}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> Created At :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.match_more_info.created_at}              
            </Col>
          </Row>
          </>:
          null
           }
          
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={this.toggleModalMatch}>
              OK
              </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.modalLeague}
          toggle={this.toggleModalLeague}
          className="modal-dialog-centered modal-lg"
          >
          <ModalHeader toggle={this.toggleModalLeague} className="bg-primary">
          League More Info
          </ModalHeader>
          <ModalBody>
          <Row className="my-1" style={{alignItems:'center', width:'50%'}}>
            <Col md="6" sm="6">
                <h5 className="text-bold-600">Select League ID :</h5>                  
            </Col>
            <Col md="6" sm="6">
                <CustomInput
                  type="select"
                  name="select"
                  id="exampleSelectCustom"
                  value={this.state.league_selected_value}
                  onChange={this.showLeagueInfo}
                >
                <option value='' >----select id----</option>
                {this.state.select_league_option.map((item, index) => {
                  return(
                    <option value={item} >{item}</option>
                  )
                })}
                </CustomInput>                
            </Col>
          </Row>
          {this.state.league_more_info ?
          <>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> League Name :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.league_more_info.name}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> Sport ID :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.league_more_info.sport_id}              
            </Col>
          </Row>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> Created At :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.league_more_info.created_at}              
            </Col>
          </Row>
          </>:
          null
           }
          
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={this.toggleModalLeague}>
              OK
              </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.modalSport}
          toggle={this.toggleModalSport}
          className="modal-dialog-centered modal-lg"
          >
          <ModalHeader toggle={this.toggleModalSport} className="bg-primary">
          Sport More Info
          </ModalHeader>
          <ModalBody>
          <Row className="my-1" style={{alignItems:'center', width:'50%'}}>
            <Col md="6" sm="6">
                <h5 className="text-bold-600">Select Sport ID :</h5>                  
            </Col>
            <Col md="6" sm="6">
                <CustomInput
                  type="select"
                  name="select"
                  id="exampleSelectCustom"
                  value={this.state.sport_selected_value}
                  onChange={this.showSportInfo}
                >
                <option value='' >----select id----</option>
                {this.state.select_sport_option.map((item, index) => {
                  return(
                    <option value={item} >{item}</option>
                  )
                })}
                </CustomInput>                
            </Col>
          </Row>
          {this.state.sport_more_info ?
          <>
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> Sport Name :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.sport_more_info.name}              
            </Col>
          </Row>
          
          <Row style={{width:'50%'}}>
            <Col md="6" sm="6">
                <h5> Created At :</h5>                  
            </Col>
            <Col md="6" sm="6">
                {this.state.sport_more_info.created_at}              
            </Col>
          </Row>
          </>:
          null
           }
          
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={this.toggleModalSport}>
              OK
              </Button>{" "}
          </ModalFooter>
        </Modal>

        <h3 className="mb-1" >Overview</h3>
        <Row>
          <Col lg="3" sm="6">
            <StatisticsCard
              hideChart
              iconRight
              iconBg="primary"
              icon={<Cpu className="primary" size={22} />}
              stat={this.state.result.overview.total_no_of_betslips}
              statTitle="Total no of betslips"
            />
          </Col>
          <Col lg="3" sm="6">
            <StatisticsCard
              hideChart
              iconRight
              iconBg="success"
              icon={<Server className="success" size={22} />}
              stat={this.state.result.overview.total_no_of_placed_odds}
              statTitle="Total no of placed odds"
            />
          </Col>
          <Col lg="3" sm="6">
            <StatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Activity className="danger" size={22} />}
              stat={this.state.result.overview.total_no_of_paricipated_user}
              statTitle="Total no of paricipated users"
            />
          </Col>
          <Col lg="3" sm="6">
            <StatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Smile className="danger" size={22} />}
              stat={this.state.result.overview.total_placed_amount}
              statTitle="Total placed amount"
            />
          </Col>
        </Row>
        <h3 className="mb-1" >User INFO</h3>
        <Row>
          <Col lg="3" sm="6" onClick={() => this.optionSetterUser(this.state.result.user_info.user_with_highest_no_of_placed_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="primary"
              icon={<Cpu className="primary" size={22} />}
              stat1={this.state.result.user_info.user_with_highest_no_of_placed_bet}
              statTitle1="User with highest no of placed bet"
              stat2={this.state.result.user_info.highest_placed_bet_count}
              statTitle2="highest no of placed bet"
            />
          </Col>
          <Col lg="3" sm="6" onClick={() => this.optionSetterUser(this.state.result.user_info.user_with_lowest_no_of_placed_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="success"
              icon={<Server className="success" size={22} />}
              stat1={this.state.result.user_info.user_with_lowest_no_of_placed_bet}
              statTitle1="User with lowest no of placed bet"
              stat2={this.state.result.user_info.lowest_placed_bet_count}
              statTitle2="lowest no of placed bet"
            />
          </Col>
          <Col lg="3" sm="6" onClick={() => this.optionSetterUser(this.state.result.user_info.user_with_highest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Activity className="danger" size={22} />}
              stat1={this.state.result.user_info.user_with_highest_placed_amount}
              statTitle1="User with highest placed amount"
              stat2={this.state.result.user_info.highest_placed_amount}
              statTitle2="highest placed amount"
            />
          </Col>
          <Col lg="3" sm="6" onClick={() => this.optionSetterUser(this.state.result.user_info.user_with_lowest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Smile className="danger" size={22} />}
              stat1={this.state.result.user_info.user_with_lowest_placed_amount}
              statTitle1="User with lowest placed amount"
              stat2={this.state.result.user_info.lowest_placed_amount}
              statTitle2="lowest placed amount"
            />
          </Col>
        </Row>
        <h3 className="mb-1" >Odd INFO</h3>
        <Row>
          <Col lg="6" sm="6" onClick={() => this.optionSetterOdds(this.state.result.odds_info.odd_with_highest_no_of_times_place_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="primary"
              icon={<Cpu className="primary" size={22} />}
              stat1={this.state.result.odds_info.odd_with_highest_no_of_times_place_bet}
              statTitle1="Odd with highest no of times bet placed"
              stat2={this.state.result.odds_info.highest_no_of_times_place_bet_count}
              statTitle2="highest no of times bet placed"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterOdds(this.state.result.odds_info.odd_with_lowest_no_of_times_place_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="success"
              icon={<Server className="success" size={22} />}
              stat1={this.state.result.odds_info.odd_with_lowest_no_of_times_place_bet}
              statTitle1="Odd with lowest no of times bet placed"
              stat2={this.state.result.odds_info.lowest_no_of_times_place_bet_count}
              statTitle2="lowest no of times bet placed"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterOdds(this.state.result.odds_info.odd_with_highest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Activity className="danger" size={22} />}
              stat1={this.state.result.odds_info.odd_with_highest_placed_amount}
              statTitle1="Odd with highest placed amount"
              stat2={this.state.result.odds_info.highest_placed_amount_on_bet}
              statTitle2="highest placed amount"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterOdds(this.state.result.odds_info.odd_with_lowest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Smile className="danger" size={22} />}
              stat1={this.state.result.odds_info.odd_with_lowest_placed_amount}
              statTitle1="Odd with lowest placed amount"
              stat2={this.state.result.odds_info.lowest_placed_amount_on_bet}
              statTitle2="lowest placed amount"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterOdds(this.state.result.odds_info.odd_with_highest_no_of_users)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Eye className="danger" size={22} />}
              stat1={this.state.result.odds_info.odd_with_highest_no_of_users}
              statTitle1="Odd with highest no of users"
              stat2={this.state.result.odds_info.highest_no_of_users}
              statTitle2="highest no of users"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterOdds(this.state.result.odds_info.odd_with_lowest_no_of_users)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Mail className="danger" size={22} />}
              stat1={this.state.result.odds_info.odd_with_lowest_no_of_users}
              statTitle1="Odd with lowest no of users"
              stat2={this.state.result.odds_info.lowest_no_of_users}
              statTitle2="lowest no of users"
            />
          </Col>
        </Row>
        <h3 className="mb-1" >Market INFO</h3>
        <Row>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMarket(this.state.result.market_info.market_with_highest_no_of_times_place_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="primary"
              icon={<Cpu className="primary" size={22} />}
              stat1={this.state.result.market_info.market_with_highest_no_of_times_place_bet}
              statTitle1="Market with highest no of times bet placed"
              stat2={this.state.result.market_info.highest_no_of_times_place_bet_count}
              statTitle2="highest no of times bet placed"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMarket(this.state.result.market_info.market_with_lowest_no_of_times_place_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="success"
              icon={<Server className="success" size={22} />}
              stat1={this.state.result.market_info.market_with_lowest_no_of_times_place_bet}
              statTitle1="Market with lowest no of times bet placed"
              stat2={this.state.result.market_info.lowest_no_of_times_place_bet_count}
              statTitle2="lowest no of times bet placed"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMarket(this.state.result.market_info.market_with_highest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Activity className="danger" size={22} />}
              stat1={this.state.result.market_info.market_with_highest_placed_amount}
              statTitle1="Market with highest placed amount"
              stat2={this.state.result.market_info.highest_placed_amount_on_bet}
              statTitle2="highest placed amount"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMarket(this.state.result.market_info.market_with_lowest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Smile className="danger" size={22} />}
              stat1={this.state.result.market_info.market_with_lowest_placed_amount}
              statTitle1="Market with lowest placed amount"
              stat2={this.state.result.market_info.lowest_placed_amount_on_bet}
              statTitle2="lowest placed amount"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMarket(this.state.result.market_info.market_with_highest_no_of_users)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Eye className="danger" size={22} />}
              stat1={this.state.result.market_info.market_with_highest_no_of_users}
              statTitle1="Market with highest no of users"
              stat2={this.state.result.market_info.highest_no_of_users}
              statTitle2="highest no of users"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMarket(this.state.result.market_info.market_with_lowest_no_of_users)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Mail className="danger" size={22} />}
              stat1={this.state.result.market_info.market_with_lowest_no_of_users}
              statTitle1="Market with lowest no of users"
              stat2={this.state.result.market_info.lowest_no_of_users}
              statTitle2="lowest no of users"
            />
          </Col>
        </Row>

        <h3 className="mb-1" >Match INFO</h3>
        <Row>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMatch(this.state.result.match_info.match_with_highest_no_of_times_place_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="primary"
              icon={<Cpu className="primary" size={22} />}
              stat1={this.state.result.match_info.match_with_highest_no_of_times_place_bet}
              statTitle1="Match with highest no of times bet placed"
              stat2={this.state.result.match_info.highest_no_of_times_place_bet_count}
              statTitle2="highest no of times bet placed"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMatch(this.state.result.match_info.match_with_lowest_no_of_times_place_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="success"
              icon={<Server className="success" size={22} />}
              stat1={this.state.result.match_info.match_with_lowest_no_of_times_place_bet}
              statTitle1="Match with lowest no of times bet placed"
              stat2={this.state.result.match_info.lowest_no_of_times_place_bet_count}
              statTitle2="lowest no of times bet placed"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMatch(this.state.result.match_info.match_with_highest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Activity className="danger" size={22} />}
              stat1={this.state.result.match_info.match_with_highest_placed_amount}
              statTitle1="Match with highest placed amount"
              stat2={this.state.result.match_info.highest_placed_amount_on_bet}
              statTitle2="highest placed amount"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMatch(this.state.result.match_info.match_with_lowest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Smile className="danger" size={22} />}
              stat1={this.state.result.match_info.match_with_lowest_placed_amount}
              statTitle1="Match with lowest placed amount"
              stat2={this.state.result.match_info.lowest_placed_amount_on_bet}
              statTitle2="lowest placed amount"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMatch(this.state.result.match_info.match_with_highest_no_of_users)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Eye className="danger" size={22} />}
              stat1={this.state.result.match_info.match_with_highest_no_of_users}
              statTitle1="Match with highest no of users"
              stat2={this.state.result.match_info.highest_no_of_users}
              statTitle2="highest no of users"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterMatch(this.state.result.match_info.match_with_lowest_no_of_users)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Mail className="danger" size={22} />}
              stat1={this.state.result.match_info.match_with_lowest_no_of_users}
              statTitle1="Match with lowest no of users"
              stat2={this.state.result.match_info.lowest_no_of_users}
              statTitle2="lowest no of users"
            />
          </Col>
        </Row>

        <h3 className="mb-1" >League INFO</h3>
        <Row>
          <Col lg="6" sm="6" onClick={() => this.optionSetterLeague(this.state.result.league_info.league_with_highest_no_of_times_place_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="primary"
              icon={<Cpu className="primary" size={22} />}
              stat1={this.state.result.league_info.league_with_highest_no_of_times_place_bet}
              statTitle1="League with highest no of times bet placed"
              stat2={this.state.result.league_info.highest_no_of_times_place_bet_count}
              statTitle2="highest no of times bet placed"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterLeague(this.state.result.league_info.league_with_lowest_no_of_times_place_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="success"
              icon={<Server className="success" size={22} />}
              stat1={this.state.result.league_info.league_with_lowest_no_of_times_place_bet}
              statTitle1="League with lowest no of times bet placed"
              stat2={this.state.result.league_info.lowest_no_of_times_place_bet_count}
              statTitle2="lowest no of times bet placed"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterLeague(this.state.result.league_info.league_with_highest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Activity className="danger" size={22} />}
              stat1={this.state.result.league_info.league_with_highest_placed_amount}
              statTitle1="League with highest placed amount"
              stat2={this.state.result.league_info.highest_placed_amount_on_bet}
              statTitle2="highest placed amount"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterLeague(this.state.result.league_info.league_with_lowest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Smile className="danger" size={22} />}
              stat1={this.state.result.league_info.league_with_lowest_placed_amount}
              statTitle1="League with lowest placed amount"
              stat2={this.state.result.league_info.lowest_placed_amount_on_bet}
              statTitle2="lowest placed amount"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterLeague(this.state.result.league_info.league_with_highest_no_of_users)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Eye className="danger" size={22} />}
              stat1={this.state.result.league_info.league_with_highest_no_of_users}
              statTitle1="League with highest no of users"
              stat2={this.state.result.league_info.highest_no_of_users}
              statTitle2="highest no of users"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterLeague(this.state.result.league_info.league_with_lowest_no_of_users)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Mail className="danger" size={22} />}
              stat1={this.state.result.league_info.league_with_lowest_no_of_users}
              statTitle1="League with lowest no of users"
              stat2={this.state.result.league_info.lowest_no_of_users}
              statTitle2="lowest no of users"
            />
          </Col>
        </Row>

        <h3 className="mb-1" >Sport INFO</h3>
        <Row>
          <Col lg="6" sm="6" onClick={() => this.optionSetterSport(this.state.result.sport_info.sport_with_highest_no_of_times_place_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="primary"
              icon={<Cpu className="primary" size={22} />}
              stat1={this.state.result.sport_info.sport_with_highest_no_of_times_place_bet}
              statTitle1="Sport with highest no of times bet placed"
              stat2={this.state.result.sport_info.highest_no_of_times_place_bet_count}
              statTitle2="highest no of times bet placed"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterSport(this.state.result.sport_info.sport_with_lowest_no_of_times_place_bet)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="success"
              icon={<Server className="success" size={22} />}
              stat1={this.state.result.sport_info.sport_with_lowest_no_of_times_place_bet}
              statTitle1="Sport with lowest no of times bet placed"
              stat2={this.state.result.sport_info.lowest_no_of_times_place_bet_count}
              statTitle2="lowest no of times bet placed"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterSport(this.state.result.sport_info.sport_with_highest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Activity className="danger" size={22} />}
              stat1={this.state.result.sport_info.sport_with_highest_placed_amount}
              statTitle1="Sport with highest placed amount"
              stat2={this.state.result.sport_info.highest_placed_amount_on_bet}
              statTitle2="highest placed amount"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterSport(this.state.result.sport_info.sport_with_lowest_placed_amount)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Smile className="danger" size={22} />}
              stat1={this.state.result.sport_info.sport_with_lowest_placed_amount}
              statTitle1="Sport with lowest placed amount"
              stat2={this.state.result.sport_info.lowest_placed_amount_on_bet}
              statTitle2="lowest placed amount"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterSport(this.state.result.sport_info.sport_with_highest_no_of_users)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Eye className="danger" size={22} />}
              stat1={this.state.result.sport_info.sport_with_highest_no_of_users}
              statTitle1="Sport with highest no of users"
              stat2={this.state.result.sport_info.highest_no_of_users}
              statTitle2="highest no of users"
            />
          </Col>
          <Col lg="6" sm="6" onClick={() => this.optionSetterSport(this.state.result.sport_info.sport_with_lowest_no_of_users)}>
            <UserStatisticsCard
              hideChart
              iconRight
              iconBg="danger"
              icon={<Mail className="danger" size={22} />}
              stat1={this.state.result.sport_info.sport_with_lowest_no_of_users}
              statTitle1="Sport with lowest no of users"
              stat2={this.state.result.sport_info.lowest_no_of_users}
              statTitle2="lowest no of users"
            />
          </Col>
        </Row>
        
      </React.Fragment>
    )
  }
}

export default Result
