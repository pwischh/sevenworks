import pandas as pd 
import numpy as np
import pytesseract
from pdf2image import convert_from_path
import re
import cv2
from PIL import Image


resume_df = pd.read_csv("resume_enhancement/dat/Resume/Resume.csv")
# print(resume_df.head) # check the resume format

# print(resume_df.iloc[0]['Resume_str']) # check material in the resume. 

'''test before creating funciton'''
# image = cv2.imread("resume_enhancement/dat/data/data/ACCOUNTANT/10554236.pdf")
# gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) # doesn't run unfortunately. 
# text = pytesseract.image_to_string(gray_image) 


'''
OCR attempt on the resume data. 
'''

pdf_path = "resume_enhancement/dat/data/data/ACCOUNTANT/10554236.pdf"

def ocr(path,dpi = 300):
    pages = convert_from_path(path,dpi = dpi)
    extracted_text = ""

    for i, page in enumerate(pages):
        open_cv_image = cv2.cvtColor(np.array(page), cv2.COLOR_RGB2BGR)
        gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        text = pytesseract.image_to_string(thresh)
        extracted_text += text + "\n"

    return extracted_text

'''
put the material extracted from the ocr into different categories. 
'''
def extract_resume_text(text):
    resume_data = {}
    education_match = re.search(r"Education(.*?)(Experience|Skills|Certifications|$)", text, re.DOTALL | re.IGNORECASE)
    if education_match:
        resume_data["education"] = education_match.group(1).strip()

    experience_match = re.search(r"Experience(.*?)(Education|Skills|Certifications|$)", text, re.DOTALL | re.IGNORECASE)
    if experience_match:
        resume_data["experience"] = experience_match.group(1).strip()


    skills_match = re.search(r"Skills(.*?)(Experience|Education|Certifications|$)", text, re.DOTALL | re.IGNORECASE)
    if skills_match:
        resume_data["skills"] = skills_match.group(1).strip()

    summary_match = re.search(r"Summary(.*?)(Highlights|Experience|$)", text, re.DOTALL | re.IGNORECASE)
    if summary_match:
        resume_data["summary"] = summary_match.group(1).strip()
    
    certifications_match = re.search(r"Certifications(.*?)(Skills|Experience|Education|$)", text, re.DOTALL | re.IGNORECASE)
    if certifications_match:
        resume_data["certifications"] = certifications_match.group(1).strip()
    
    return resume_data





if __name__ == "__main__":
    test_path = "resume_enhancement/dat/data/data/ACCOUNTANT/10554236.pdf"
    test_text = ocr(test_path)
    # print(test_text)
    extract_test = extract_resume_text(test_text)
    print(extract_test)
