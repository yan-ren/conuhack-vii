import sys
from Data_Preprocess import *


period = sys.argv[1]
period = float(period)
info = Information(period)
info.update_db()
print('finish')
