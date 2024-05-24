import os
import PyPDF2
import requests
import time

# Set your OpenAI API key
openai_api_key = "any_working_key"

def extract_text_from_pdf(file_path):
    with open(file_path, 'rb') as pdf_file_obj:
        pdf_reader = PyPDF2.PdfReader(pdf_file_obj)
        num_pages = len(pdf_reader.pages)
        text = ''
        for page in range(num_pages):
            page_obj = pdf_reader.pages[page]
            text += page_obj.extract_text()
    return text

def generate_embedding(text):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {openai_api_key}'
    }
    data = {'input': text}
    ## returning gibberish since openai requires credits to be purchased
    # response = requests.post('https://api.openai.com/v1/engines/text-embedding-3-small/embeddings', headers=headers, json=data)
    # print(response.json())
    # response.raise_for_status()
    # return response.json()['data'][0]['embedding']
    time.sleep(60)
    return "23 33 44"

def main():
    pdf_dir = './pdfdir'
    for file in os.listdir(pdf_dir):
        if file.endswith('.pdf'):
            file_path = os.path.join(pdf_dir, file)
            text = extract_text_from_pdf(file_path)
            embedding = generate_embedding(text)
            print(f'File: {file}, Embedding: {embedding}')

if __name__ == '__main__':
    main()
