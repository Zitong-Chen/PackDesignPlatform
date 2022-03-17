from cgi import print_arguments
from xxlimited import new
import cv2
import numpy as np

A_INDEX = 3

def transparent_img(img, percentage:float):
    bgra_img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    b, g, r, a = cv2.split(bgra_img)
    new_a = a * (1 - percentage)
    new_a = np.array(new_a, np.uint8)
    new_img = cv2.merge([b, g, r, new_a])

    return new_img

# img = cv2.imread('./test.png', cv2.IMREAD_UNCHANGED)
# img_blur = transparent_img(img, 0.5)
# cv2.imwrite('trans.png', img_blur)