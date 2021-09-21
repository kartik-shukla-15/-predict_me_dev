# import pandas as pd
import json
file = {}
with open('oneclickbet.json', 'r') as f:
    raw_data = f.read()
    file = json.loads(raw_data)
betslip_data = file[7]['data']
odds_ids = list(map(lambda x:x['odd_id'], betslip_data))
users_ids = list(map(lambda x:x['user_id'], betslip_data))
unique_odds_ids = set(odds_ids)
unique_users_ids = set(users_ids)
odds_info = {}

for odd in unique_odds_ids:
    one_odd_info = {}
    
    one_odd_info['total_no_of_times_place_bet'] = odds_ids.count(odd)

    amount = 0
    user_list_for_one_odd = []
    for item in betslip_data:
        if item['odd_id'] == odd:
            amount += float(item['stake_amount'])
            user_list_for_one_odd.append(item['user_id'])
    one_odd_info['total_placed_amount_on_bet'] = amount
    one_odd_info['users'] = list(set(user_list_for_one_odd))
    one_odd_info['no_of_users'] = len(one_odd_info['users'])
    odds_info[odd] = one_odd_info
print(odds_info)

# betslip_data = json.dumps(file[7]['data'])
# betslip_df = pd.read_json(betslip_data)
# print(betslip_df)