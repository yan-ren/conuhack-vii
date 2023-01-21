import sys
from Data_Preprocess import *

if __name__ == '__main__':
    period = sys.argv[1]
    info = Information(period)
    info.update_db()

