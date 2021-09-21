from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
# from usermgmt.serializer import UserSerializer
# from .models import User
# from django.core.mail import send_mail
# from django.conf import settings
# import random
# import string
import json        

def get_overview(betslip_data, unique_odds_ids, unique_users_ids):
    total_no_of_betslips = len(betslip_data)
    total_no_of_placed_odds = len(unique_odds_ids)
    total_no_of_paricipated_user = len(unique_users_ids)
    amounts = list(map(lambda x:float(x['stake_amount']), betslip_data))
    total_placed_amount = sum(amounts)
    return {
        'total_no_of_betslips' : total_no_of_betslips,
        'total_no_of_placed_odds' : total_no_of_placed_odds,
        'total_no_of_paricipated_user':total_no_of_paricipated_user,
        'total_placed_amount':total_placed_amount
    }

def get_user_info(users_ids, unique_users_ids, betslip_data, users_data):
    user_betslip_info = {}
    amount_info = {}
    bet_count_list = []
    placed_amount_list = []
    for user_id in unique_users_ids:
        count = users_ids.count(user_id)
        user_betslip_info[user_id] = count
        bet_count_list.append(count)
        amount = 0
        for bet in betslip_data:
            if user_id == bet['user_id']:
                amount += float(bet['stake_amount'])
        amount_info[user_id] = amount
        placed_amount_list.append(amount)
    highest_placed_bet_count = max(bet_count_list)
    lowest_placed_bet_count = min(bet_count_list)
    highest_placed_amount = max(placed_amount_list)
    lowest_placed_amount = min(placed_amount_list)
    user_with_highest_no_of_placed_bet = [key for key in user_betslip_info if user_betslip_info[key] == highest_placed_bet_count]
    user_with_lowest_no_of_placed_bet = [key for key in user_betslip_info if user_betslip_info[key] == lowest_placed_bet_count]
    user_with_highest_placed_amount = [key for key in amount_info if amount_info[key] == highest_placed_amount]
    user_with_lowest_placed_amount = [key for key in amount_info if amount_info[key] == lowest_placed_amount]
    
    user_info = {
        'highest_placed_bet_count':highest_placed_bet_count,
        'lowest_placed_bet_count':lowest_placed_bet_count,
        'user_with_highest_no_of_placed_bet':user_with_highest_no_of_placed_bet,
        'user_with_lowest_no_of_placed_bet':user_with_lowest_no_of_placed_bet,
        'highest_placed_amount':highest_placed_amount,
        'lowest_placed_amount':lowest_placed_amount,
        'user_with_highest_placed_amount':user_with_highest_placed_amount,
        'user_with_lowest_placed_amount':user_with_lowest_placed_amount
    }

    all_user_info = {}
    for user_id in unique_users_ids:
        for item in users_data:
            if user_id == item['id']:
                all_user_info[user_id] = {
                    'first_name':item['first_name'],
                    'last_name':item['last_name'],
                    'email':item['email'],
                    'phone':item['phone'],
                    'created_at':item['created_at']
                }
    return user_info, all_user_info


def get_odds_info(odds_ids, unique_odds_ids, betslip_data, odds_data):
    odds_betslip_info = {}
    no_of_times_place_bet_list = []
    placed_amount_on_bet_list = []
    no_of_users_list = []
    for odd in unique_odds_ids:
        one_odd_info = {}    
        count = odds_ids.count(odd)
        one_odd_info['no_of_times_place_bet'] = count
        no_of_times_place_bet_list.append(count)
        amount = 0
        user_list_for_one_odd = []
        for item in betslip_data:
            if item['odd_id'] == odd:
                amount += float(item['stake_amount'])
                user_list_for_one_odd.append(item['user_id'])
        one_odd_info['placed_amount_on_bet'] = amount
        placed_amount_on_bet_list.append(amount)
        one_odd_info['users'] = list(set(user_list_for_one_odd))
        one_odd_info['no_of_users'] = len(one_odd_info['users'])
        no_of_users_list.append(len(one_odd_info['users']))
        odds_betslip_info[odd] = one_odd_info
    highest_no_of_times_place_bet_count = max(no_of_times_place_bet_list)
    lowest_no_of_times_place_bet_count = min(no_of_times_place_bet_list)
    highest_placed_amount_on_bet = max(placed_amount_on_bet_list)
    lowest_placed_amount_on_bet = min(placed_amount_on_bet_list)
    highest_no_of_users = max(no_of_users_list)
    lowest_no_of_users = min(no_of_users_list)
    odd_with_highest_no_of_times_place_bet = [key for key in odds_betslip_info if odds_betslip_info[key]['no_of_times_place_bet'] == highest_no_of_times_place_bet_count]
    odd_with_lowest_no_of_times_place_bet = [key for key in odds_betslip_info if odds_betslip_info[key]['no_of_times_place_bet'] == lowest_no_of_times_place_bet_count]
    odd_with_highest_placed_amount = [key for key in odds_betslip_info if odds_betslip_info[key]['placed_amount_on_bet'] == highest_placed_amount_on_bet]
    odd_with_lowest_placed_amount = [key for key in odds_betslip_info if odds_betslip_info[key]['placed_amount_on_bet'] == lowest_placed_amount_on_bet]
    odd_with_highest_no_of_users = [key for key in odds_betslip_info if odds_betslip_info[key]['no_of_users'] == highest_no_of_users]
    odd_with_lowest_no_of_users = [key for key in odds_betslip_info if odds_betslip_info[key]['no_of_users'] == lowest_no_of_users]
    odds_info = {
        'highest_no_of_times_place_bet_count':highest_no_of_times_place_bet_count,
        'lowest_no_of_times_place_bet_count':lowest_no_of_times_place_bet_count,
        'highest_placed_amount_on_bet':highest_placed_amount_on_bet,
        'lowest_placed_amount_on_bet':lowest_placed_amount_on_bet,
        'highest_no_of_users':highest_no_of_users,
        'lowest_no_of_users':lowest_no_of_users,
        'odd_with_highest_no_of_times_place_bet':odd_with_highest_no_of_times_place_bet,
        'odd_with_lowest_no_of_times_place_bet':odd_with_lowest_no_of_times_place_bet,
        'odd_with_highest_placed_amount':odd_with_highest_placed_amount,
        'odd_with_lowest_placed_amount':odd_with_lowest_placed_amount,
        'odd_with_highest_no_of_users':odd_with_highest_no_of_users,
        'odd_with_lowest_no_of_users':odd_with_lowest_no_of_users
    }

    all_odds_info = {}
    for item in odds_data:
        if item['id'] in unique_odds_ids:
            all_odds_info[item['id']] = item
    
    return odds_info, all_odds_info, odds_betslip_info

def get_market_info(all_odds_info, odds_betslip_info, market_data):
    market_odds_holder= {}
    market_betslip_info = {}
    for key in all_odds_info:
        if all_odds_info[key]['odd_type_id'] not in market_odds_holder:
            market_odds_holder[all_odds_info[key]['odd_type_id']] = [all_odds_info[key]['id']]
        else:
            market_odds_holder[all_odds_info[key]['odd_type_id']].append(all_odds_info[key]['id'])

    no_of_times_place_bet_list = []
    placed_amount_on_bet_list = []
    no_of_users_list = []
    for key in market_odds_holder:
        one_market_info = {}
        odds_list = market_odds_holder[key]
        bet_count = 0
        amount = 0
        users = []
        for odd_id in odds_list:
            bet_count += odds_betslip_info[odd_id]['no_of_times_place_bet']
            amount += odds_betslip_info[odd_id]['placed_amount_on_bet']
            users += odds_betslip_info[odd_id]['users']
        users = list(set(users))
        users_count = len(users)
        one_market_info['no_of_times_place_bet'] = bet_count
        one_market_info['placed_amount_on_bet'] = amount
        one_market_info['no_of_users'] = users_count
        one_market_info['users'] = users
        no_of_times_place_bet_list.append(bet_count)
        placed_amount_on_bet_list.append(amount)
        no_of_users_list.append(users_count)
        market_betslip_info[key] = one_market_info
         
    highest_no_of_times_place_bet_count = max(no_of_times_place_bet_list)
    lowest_no_of_times_place_bet_count = min(no_of_times_place_bet_list)
    highest_placed_amount_on_bet = max(placed_amount_on_bet_list)
    lowest_placed_amount_on_bet = min(placed_amount_on_bet_list)
    highest_no_of_users = max(no_of_users_list)
    lowest_no_of_users = min(no_of_users_list)
    market_with_highest_no_of_times_place_bet = [key for key in market_betslip_info if market_betslip_info[key]['no_of_times_place_bet'] == highest_no_of_times_place_bet_count]
    market_with_lowest_no_of_times_place_bet = [key for key in market_betslip_info if market_betslip_info[key]['no_of_times_place_bet'] == lowest_no_of_times_place_bet_count]
    market_with_highest_placed_amount = [key for key in market_betslip_info if market_betslip_info[key]['placed_amount_on_bet'] == highest_placed_amount_on_bet]
    market_with_lowest_placed_amount = [key for key in market_betslip_info if market_betslip_info[key]['placed_amount_on_bet'] == lowest_placed_amount_on_bet]
    market_with_highest_no_of_users = [key for key in market_betslip_info if market_betslip_info[key]['no_of_users'] == highest_no_of_users]
    market_with_lowest_no_of_users = [key for key in market_betslip_info if market_betslip_info[key]['no_of_users'] == lowest_no_of_users]
    market_info = {
        'highest_no_of_times_place_bet_count':highest_no_of_times_place_bet_count,
        'lowest_no_of_times_place_bet_count':lowest_no_of_times_place_bet_count,
        'highest_placed_amount_on_bet':highest_placed_amount_on_bet,
        'lowest_placed_amount_on_bet':lowest_placed_amount_on_bet,
        'highest_no_of_users':highest_no_of_users,
        'lowest_no_of_users':lowest_no_of_users,
        'market_with_highest_no_of_times_place_bet':market_with_highest_no_of_times_place_bet,
        'market_with_lowest_no_of_times_place_bet':market_with_lowest_no_of_times_place_bet,
        'market_with_highest_placed_amount':market_with_highest_placed_amount,
        'market_with_lowest_placed_amount':market_with_lowest_placed_amount,
        'market_with_highest_no_of_users':market_with_highest_no_of_users,
        'market_with_lowest_no_of_users':market_with_lowest_no_of_users
    }

    unique_market_ids = list(set(market_betslip_info.keys()))
    all_market_info = {}
    for item in market_data:
        if item['id'] in unique_market_ids:
            all_market_info[item['id']] = item

    return market_info, market_betslip_info, all_market_info

def get_match_info(all_market_info, market_betslip_info, match_data):
    match_market_holder= {}
    match_betslip_info = {}
    for key in all_market_info:
        if all_market_info[key]['match_id'] not in match_market_holder:
            match_market_holder[all_market_info[key]['match_id']] = [all_market_info[key]['id']]
        else:
            match_market_holder[all_market_info[key]['match_id']].append(all_market_info[key]['id'])

    no_of_times_place_bet_list = []
    placed_amount_on_bet_list = []
    no_of_users_list = []
    for key in match_market_holder:
        one_match_info = {}
        market_list = match_market_holder[key]
        bet_count = 0
        amount = 0
        users = []
        for market_id in market_list:
            bet_count += market_betslip_info[market_id]['no_of_times_place_bet']
            amount += market_betslip_info[market_id]['placed_amount_on_bet']
            users += market_betslip_info[market_id]['users']
        users = list(set(users))
        users_count = len(users)
        one_match_info['no_of_times_place_bet'] = bet_count
        one_match_info['placed_amount_on_bet'] = amount
        one_match_info['no_of_users'] = users_count
        one_match_info['users'] = users
        no_of_times_place_bet_list.append(bet_count)
        placed_amount_on_bet_list.append(amount)
        no_of_users_list.append(users_count)
        match_betslip_info[key] = one_match_info
         
    highest_no_of_times_place_bet_count = max(no_of_times_place_bet_list)
    lowest_no_of_times_place_bet_count = min(no_of_times_place_bet_list)
    highest_placed_amount_on_bet = max(placed_amount_on_bet_list)
    lowest_placed_amount_on_bet = min(placed_amount_on_bet_list)
    highest_no_of_users = max(no_of_users_list)
    lowest_no_of_users = min(no_of_users_list)
    match_with_highest_no_of_times_place_bet = [key for key in match_betslip_info if match_betslip_info[key]['no_of_times_place_bet'] == highest_no_of_times_place_bet_count]
    match_with_lowest_no_of_times_place_bet = [key for key in match_betslip_info if match_betslip_info[key]['no_of_times_place_bet'] == lowest_no_of_times_place_bet_count]
    match_with_highest_placed_amount = [key for key in match_betslip_info if match_betslip_info[key]['placed_amount_on_bet'] == highest_placed_amount_on_bet]
    match_with_lowest_placed_amount = [key for key in match_betslip_info if match_betslip_info[key]['placed_amount_on_bet'] == lowest_placed_amount_on_bet]
    match_with_highest_no_of_users = [key for key in match_betslip_info if match_betslip_info[key]['no_of_users'] == highest_no_of_users]
    match_with_lowest_no_of_users = [key for key in match_betslip_info if match_betslip_info[key]['no_of_users'] == lowest_no_of_users]
    match_info = {
        'highest_no_of_times_place_bet_count':highest_no_of_times_place_bet_count,
        'lowest_no_of_times_place_bet_count':lowest_no_of_times_place_bet_count,
        'highest_placed_amount_on_bet':highest_placed_amount_on_bet,
        'lowest_placed_amount_on_bet':lowest_placed_amount_on_bet,
        'highest_no_of_users':highest_no_of_users,
        'lowest_no_of_users':lowest_no_of_users,
        'match_with_highest_no_of_times_place_bet':match_with_highest_no_of_times_place_bet,
        'match_with_lowest_no_of_times_place_bet':match_with_lowest_no_of_times_place_bet,
        'match_with_highest_placed_amount':match_with_highest_placed_amount,
        'match_with_lowest_placed_amount':match_with_lowest_placed_amount,
        'match_with_highest_no_of_users':match_with_highest_no_of_users,
        'match_with_lowest_no_of_users':match_with_lowest_no_of_users
    }

    unique_match_ids = list(set(match_betslip_info.keys()))
    all_match_info = {}
    for item in match_data:
        if item['id'] in unique_match_ids:
            all_match_info[item['id']] = item

    return match_info, match_betslip_info, all_match_info
    
def get_league_info(all_match_info, match_betslip_info, league_data):
    league_match_holder = {}
    league_betslip_info = {}
    for key in all_match_info:
        if all_match_info[key]['league_id'] not in league_match_holder:
            league_match_holder[all_match_info[key]['league_id']] = [all_match_info[key]['id']]
        else:
            league_match_holder[all_match_info[key]['league_id']].append(all_match_info[key]['id'])

    no_of_times_place_bet_list = []
    placed_amount_on_bet_list = []
    no_of_users_list = []
    for key in league_match_holder:
        one_league_info = {}
        match_list = league_match_holder[key]
        bet_count = 0
        amount = 0
        users = []
        for match_id in match_list:
            bet_count += match_betslip_info[match_id]['no_of_times_place_bet']
            amount += match_betslip_info[match_id]['placed_amount_on_bet']
            users += match_betslip_info[match_id]['users']
        users = list(set(users))
        users_count = len(users)
        one_league_info['no_of_times_place_bet'] = bet_count
        one_league_info['placed_amount_on_bet'] = amount
        one_league_info['no_of_users'] = users_count
        one_league_info['users'] = users
        no_of_times_place_bet_list.append(bet_count)
        placed_amount_on_bet_list.append(amount)
        no_of_users_list.append(users_count)
        league_betslip_info[key] = one_league_info
         
    highest_no_of_times_place_bet_count = max(no_of_times_place_bet_list)
    lowest_no_of_times_place_bet_count = min(no_of_times_place_bet_list)
    highest_placed_amount_on_bet = max(placed_amount_on_bet_list)
    lowest_placed_amount_on_bet = min(placed_amount_on_bet_list)
    highest_no_of_users = max(no_of_users_list)
    lowest_no_of_users = min(no_of_users_list)
    league_with_highest_no_of_times_place_bet = [key for key in league_betslip_info if league_betslip_info[key]['no_of_times_place_bet'] == highest_no_of_times_place_bet_count]
    league_with_lowest_no_of_times_place_bet = [key for key in league_betslip_info if league_betslip_info[key]['no_of_times_place_bet'] == lowest_no_of_times_place_bet_count]
    league_with_highest_placed_amount = [key for key in league_betslip_info if league_betslip_info[key]['placed_amount_on_bet'] == highest_placed_amount_on_bet]
    league_with_lowest_placed_amount = [key for key in league_betslip_info if league_betslip_info[key]['placed_amount_on_bet'] == lowest_placed_amount_on_bet]
    league_with_highest_no_of_users = [key for key in league_betslip_info if league_betslip_info[key]['no_of_users'] == highest_no_of_users]
    league_with_lowest_no_of_users = [key for key in league_betslip_info if league_betslip_info[key]['no_of_users'] == lowest_no_of_users]
    league_info = {
        'highest_no_of_times_place_bet_count':highest_no_of_times_place_bet_count,
        'lowest_no_of_times_place_bet_count':lowest_no_of_times_place_bet_count,
        'highest_placed_amount_on_bet':highest_placed_amount_on_bet,
        'lowest_placed_amount_on_bet':lowest_placed_amount_on_bet,
        'highest_no_of_users':highest_no_of_users,
        'lowest_no_of_users':lowest_no_of_users,
        'league_with_highest_no_of_times_place_bet':league_with_highest_no_of_times_place_bet,
        'league_with_lowest_no_of_times_place_bet':league_with_lowest_no_of_times_place_bet,
        'league_with_highest_placed_amount':league_with_highest_placed_amount,
        'league_with_lowest_placed_amount':league_with_lowest_placed_amount,
        'league_with_highest_no_of_users':league_with_highest_no_of_users,
        'league_with_lowest_no_of_users':league_with_lowest_no_of_users
    }

    unique_league_ids = list(set(league_betslip_info.keys()))
    all_league_info = {}
    for item in league_data:
        if item['id'] in unique_league_ids:
            all_league_info[item['id']] = item

    return league_info, league_betslip_info, all_league_info

def get_sport_info(all_league_info, league_betslip_info, sport_data):
    sport_league_holder = {}
    sport_betslip_info = {}
    for key in all_league_info:
        if all_league_info[key]['sport_id'] not in sport_league_holder:
            sport_league_holder[all_league_info[key]['sport_id']] = [all_league_info[key]['id']]
        else:
            sport_league_holder[all_league_info[key]['sport_id']].append(all_league_info[key]['id'])

    no_of_times_place_bet_list = []
    placed_amount_on_bet_list = []
    no_of_users_list = []
    for key in sport_league_holder:
        one_sport_info = {}
        leauge_list = sport_league_holder[key]
        bet_count = 0
        amount = 0
        users = []
        for league_id in leauge_list:
            bet_count += league_betslip_info[league_id]['no_of_times_place_bet']
            amount += league_betslip_info[league_id]['placed_amount_on_bet']
            users += league_betslip_info[league_id]['users']
        users = list(set(users))
        users_count = len(users)
        one_sport_info['no_of_times_place_bet'] = bet_count
        one_sport_info['placed_amount_on_bet'] = amount
        one_sport_info['no_of_users'] = users_count
        one_sport_info['users'] = users
        no_of_times_place_bet_list.append(bet_count)
        placed_amount_on_bet_list.append(amount)
        no_of_users_list.append(users_count)
        sport_betslip_info[key] = one_sport_info
         
    highest_no_of_times_place_bet_count = max(no_of_times_place_bet_list)
    lowest_no_of_times_place_bet_count = min(no_of_times_place_bet_list)
    highest_placed_amount_on_bet = max(placed_amount_on_bet_list)
    lowest_placed_amount_on_bet = min(placed_amount_on_bet_list)
    highest_no_of_users = max(no_of_users_list)
    lowest_no_of_users = min(no_of_users_list)
    sport_with_highest_no_of_times_place_bet = [key for key in sport_betslip_info if sport_betslip_info[key]['no_of_times_place_bet'] == highest_no_of_times_place_bet_count]
    sport_with_lowest_no_of_times_place_bet = [key for key in sport_betslip_info if sport_betslip_info[key]['no_of_times_place_bet'] == lowest_no_of_times_place_bet_count]
    sport_with_highest_placed_amount = [key for key in sport_betslip_info if sport_betslip_info[key]['placed_amount_on_bet'] == highest_placed_amount_on_bet]
    sport_with_lowest_placed_amount = [key for key in sport_betslip_info if sport_betslip_info[key]['placed_amount_on_bet'] == lowest_placed_amount_on_bet]
    sport_with_highest_no_of_users = [key for key in sport_betslip_info if sport_betslip_info[key]['no_of_users'] == highest_no_of_users]
    sport_with_lowest_no_of_users = [key for key in sport_betslip_info if sport_betslip_info[key]['no_of_users'] == lowest_no_of_users]
    sport_info = {
        'highest_no_of_times_place_bet_count':highest_no_of_times_place_bet_count,
        'lowest_no_of_times_place_bet_count':lowest_no_of_times_place_bet_count,
        'highest_placed_amount_on_bet':highest_placed_amount_on_bet,
        'lowest_placed_amount_on_bet':lowest_placed_amount_on_bet,
        'highest_no_of_users':highest_no_of_users,
        'lowest_no_of_users':lowest_no_of_users,
        'sport_with_highest_no_of_times_place_bet':sport_with_highest_no_of_times_place_bet,
        'sport_with_lowest_no_of_times_place_bet':sport_with_lowest_no_of_times_place_bet,
        'sport_with_highest_placed_amount':sport_with_highest_placed_amount,
        'sport_with_lowest_placed_amount':sport_with_lowest_placed_amount,
        'sport_with_highest_no_of_users':sport_with_highest_no_of_users,
        'sport_with_lowest_no_of_users':sport_with_lowest_no_of_users
    }

    unique_sport_ids = list(set(sport_betslip_info.keys()))
    all_sport_info = {}
    for item in sport_data:
        if item['id'] in unique_sport_ids:
            all_sport_info[item['id']] = item

    return sport_info, sport_betslip_info, all_sport_info

@permission_classes([AllowAny ,])
@api_view(["POST"])
def file_upload(request):
    result = {}
    try:
        raw_file=request.FILES['raw_file']
        file = json.loads(raw_file.read())
        betslip_data = file[7]['data']
        users_data = file[57]['data']
        odds_data = file[34]['data']
        market_data = file[35]['data']
        match_data = file[25]['data']
        league_data = file[21]['data']
        sport_data = file[50]['data']
        odds_ids = list(map(lambda x:x['odd_id'], betslip_data))
        users_ids = list(map(lambda x:x['user_id'], betslip_data))
        unique_odds_ids = set(odds_ids)
        unique_users_ids = set(users_ids)
        overview = get_overview(betslip_data, unique_odds_ids, unique_users_ids)
        user_info, all_user_info = get_user_info(users_ids, unique_users_ids, betslip_data, users_data)
        odds_info, all_odds_info, odds_betslip_info = get_odds_info(odds_ids, unique_odds_ids, betslip_data, odds_data)
        market_info, market_betslip_info, all_market_info = get_market_info(all_odds_info, odds_betslip_info, market_data)
        match_info, match_betslip_info, all_match_info = get_match_info(all_market_info, market_betslip_info, match_data)
        league_info, league_betslip_info, all_league_info = get_league_info(all_match_info, match_betslip_info, league_data)
        sport_info, sport_betslip_info, all_sport_info = get_sport_info(all_league_info, league_betslip_info, sport_data)
        # print(sport_info, '---------------------', sport_betslip_info, '---------------------' , all_sport_info)
        result['overview'] = overview
        result['user_info'] = user_info
        result['odds_info'] = odds_info
        result['market_info'] = market_info
        result['match_info'] = match_info
        result['league_info'] = league_info
        result['sport_info'] = sport_info
        result['all_user_info'] = all_user_info
        result['all_odds_info'] = all_odds_info
        result['all_market_info'] = all_market_info
        result['all_match_info'] = all_match_info
        result['all_league_info'] = all_league_info
        result['all_sport_info'] = all_sport_info
        
        return Response({'message': 'file uploaded successfully.', 'result':result}, status.HTTP_200_OK)
    except Exception as e:
         return Response({'message': 'something went to wrong. please try again!'}, status.HTTP_500_INTERNAL_SERVER_ERROR)

# def send_otp(receiver_email, subject, message):
#     email_from = settings.EMAIL_HOST_USER
#     recipient_list = [receiver_email]
#     send_mail(subject, message, email_from, recipient_list )

# @api_view(["POST"])
# @permission_classes([AllowAny ,])
# def create_user_profile(self):
#     try:
#         user_data = self.data
#         first_name = user_data["first_name"]
#         last_name = user_data["last_name"]
#         email = user_data["email"]
#         company_name = user_data["company_name"]
#         country = user_data["country"]

#         if email:
#             email = email.lower()
#         password = "".join(random.sample((string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation), 8))

#         if not User.objects.filter(email = email).exists():
#             user_serializer = UserSerializer(data={
#                 'first_name':first_name,
#                 'last_name':last_name,
#                 'username': email,
#                 'email': email,
#                 'password':password,
#                 'company_name':company_name,
#                 'country':country,
#                 })
#             if user_serializer.is_valid():
#                 user_instance = user_serializer.save()
#                 # user_instance.set_password(password)
#                 # user_instance.save()
#                 try:
#                     sub = "Live Optics Credentials"
#                     msg = "Hi {} {}, \nYour password is - {}".format(first_name, last_name, password)
#                     send_otp(email, sub, msg)
#                     return Response({'message': 'Password has been sent on given email.'}, status.HTTP_201_CREATED)
#                 except Exception as e:
#                     print(e)
#                     return Response({"message":str(e)}, status.HTTP_400_BAD_REQUEST)
#             else:
#                 try:
#                     print(user_serializer.errors)
#                     return Response({'message': user_serializer.errors}, status.HTTP_400_BAD_REQUEST)
#                 except Exception as e:
#                     return Response({'message': str(e)}, status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response({'message': 'Email is already exist.'}, status.HTTP_400_BAD_REQUEST)
#     except Exception as e:
#         return Response({'message': 'Something went to wrong. Please try again!'}, status.HTTP_400_BAD_REQUEST)

# @api_view(["POST"])
# @permission_classes([AllowAny ,])
# def verify_account(self):
#     try:
#         user_data = self.data
#         email = user_data["email"]
#         otp = user_data["otp"]
#         if User.objects.filter(email=email):
#             user = User.objects.get(email=email)
#             if str(user.otp) == str(otp):
#                 user.is_active = True
#                 user.save()
#                 return Response({"message":"Account is activated."}, status.HTTP_200_OK)
#             else:
#                 return Response({'message': 'Please enter correct OTP.'}, status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response({'message': 'This email address is not registered with us.'}, status.HTTP_400_BAD_REQUEST) 
#     except Exception as e:
#         return Response({'message': 'Something went to wrong. Please try again!'}, status.HTTP_400_BAD_REQUEST)

# @permission_classes([AllowAny ,])
# @api_view(["POST"])
# def forgot_password(request):
#     password = "".join(random.sample((string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation), 8))
#     email=request.data.get('email')
#     if email:
#         email = email.lower()
#     if User.objects.filter(email=email):
#         u = User.objects.get(email=email)
#         u.set_password(password)
#         u.save()
#         try:
#             sub = "Live Optics Credentials"
#             msg = "Hi {} {}, \nYour new password is - {}".format(u.first_name, u.last_name, password)
#             send_otp(email, sub, msg)
#             return Response({"message":"New password has been sent on registered email."}, status.HTTP_201_CREATED)
#         except Exception as e:
#             print(e)
#             return Response({"message":str(e)}, status.HTTP_400_BAD_REQUEST)
#     else:
#         return Response({'message': 'This email address is not registered with us.'}, status.HTTP_400_BAD_REQUEST) 
        