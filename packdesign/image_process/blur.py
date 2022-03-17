import cv2

def blur_image(img, percentage:float):
    h, w, _ = img.shape
    kernel_h = int(h * percentage)
    kernel_w = int(w * percentage)

    # ksize should be odd and greater than zero 
    if kernel_h <= 0:
        kernel_h = 1
    if kernel_w <= 0:
        kernel_w = 1

    if kernel_h % 2 != 1:
        kernel_h += 1
    if kernel_w % 2 != 1:
        kernel_w += 1

    img_blur = cv2.GaussianBlur(img, ksize=(kernel_h, kernel_w), sigmaX=0, sigmaY=0)
    return img_blur


# img = cv2.imread('test.png', cv2.IMREAD_UNCHANGED)
# img_blur = blur_image(img, 0.05)
# cv2.imwrite('blur.png', img_blur)
