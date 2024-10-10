import streamlit as st
import os
import io
import base64
from PIL import Image
from together import Together
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Initialize Together client
client = None


def initialize_client():
    global client
    api_key = os.getenv("TOGETHER_API_KEY")
    if api_key:
        client = Together(api_key=api_key)
    else:
        raise ValueError(
            "API key not found. Please ensure it is set in the .env file.")


def encode_image(image, max_size=(800, 800), quality=85):
    with Image.open(image) as img:
        img.thumbnail(max_size)
        if img.mode in ('RGBA', 'LA'):
            background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1])
            img = background
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG", quality=quality)
        return base64.b64encode(buffered.getvalue()).decode('utf-8')


def analyze_ecg_image(image):
    global client
    if client is None:
        initialize_client()

    static_prompt = "Analyze the uploaded ECG image and provide insights."
    encoded_image = encode_image(image)

    messages = [
        {
            "role": "user",
            "content": [
                {"type": "text", "text": static_prompt},
                {"type": "image_url", "image_url": {
                    "url": f"data:image/jpeg;base64,{encoded_image}"}}
            ]
        }
    ]

    try:
        stream = client.chat.completions.create(
            model="meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
            messages=messages,
            max_tokens=250,
            stream=True,
        )

        response = ""
        for chunk in stream:
            if chunk.choices and len(chunk.choices) > 0:
                if chunk.choices[0].delta.content is not None:
                    response += chunk.choices[0].delta.content

        return response

    except Exception as e:
        return f"An error occurred: {str(e)}"


# Sample patient report data
patient_reports = [
    {"patient_name": "John Doe", "report_date": "2024-10-01", "diagnosis": "Normal ECG"},
    {"patient_name": "Jane Smith", "report_date": "2024-09-28",
        "diagnosis": "Mild arrhythmia"},
    {"patient_name": "Alice Johnson", "report_date": "2024-09-15",
        "diagnosis": "Myocardial infarction"},
    {"patient_name": "Bob Brown", "report_date": "2024-08-20",
        "diagnosis": "Normal ECG"},
]

# Streamlit UI
st.set_page_config(page_title="Cardiac Tek - ECG Diagnosis App", layout="wide")

# Sidebar for navigation
with st.sidebar:
    st.title("Navigation")
    st.markdown("### Doctor Gilbert")
    st.markdown("---")
    selected_option = st.radio(
        "Go to", ["Dashboard", "Patient Reports", "Patients", "ECG Analysis", "Settings"])

# Main content area
if selected_option == "Dashboard":
    st.title("Welcome to Cardiac Tek - ECG Diagnosis App")
    st.write("This application provides ECG analysis and patient management tools.")

    # Create a grid layout for the dashboard
    col1, col2 = st.columns(2)

    with col1:
        # Patient Data Section
        with st.container():
            st.markdown(
                """
                <div style='border: 2px solid #1E90FF; border-radius: 5px; padding: 10px;'>
                    <h4>Patient Data</h4>
                    <p>Patient ID: 12345</p>
                    <p>Name: John Doe</p>
                    <p>Age: 65</p>
                    <p>History: Previous myocardial infarction, hypertension.</p>
                </div>
                """, unsafe_allow_html=True)

        # Patient Reports Section
        with st.container():
            st.markdown(
                """
                <div style='border: 2px solid #1E90FF; border-radius: 5px; padding: 10px;'>
                    <h4>Patient Reports</h4>
                    <p>Report ID: R123</p>
                    <p>Patient Name: John Doe</p>
                    <p>Date: 2024-10-10</p>
                    <p>Findings: Normal ECG findings.</p>
                    <p>Recommendations: No further action required.</p>
                </div>
                """, unsafe_allow_html=True)

    with col2:
        # Patient List Section
        with st.container():
            st.markdown(
                """
                <div style='border: 2px solid #1E90FF; border-radius: 5px; padding: 10px;'>
                    <h4>Patient List</h4>
                    <p>12345: John Doe, Age: 65</p>
                    <p>67890: Jane Smith, Age: 72</p>
                    <p>54321: Alice Johnson, Age: 50</p>
                </div>
                """, unsafe_allow_html=True)

        # Settings Section
        with st.container():
            st.markdown(
                """
                <div style='border: 2px solid #1E90FF; border-radius: 5px; padding: 10px;'>
                    <h4>Settings</h4>
                    <p>This section will allow you to adjust application settings.</p>
                    <p>Example: Change password, update profile, etc.</p>
                </div>
                """, unsafe_allow_html=True)

        # Referrals Section
        with st.container():
            st.markdown(
                """
                <div style='border: 2px solid #1E90FF; border-radius: 5px; padding: 10px;'>
                    <h4>Referrals</h4>
                    <p>This section can be used to manage patient referrals.</p>
                    <p>You can add functionality to track and manage referrals here.</p>
                </div>
                """, unsafe_allow_html=True)

elif selected_option == "ECG Analysis":
    st.title("ECG Analysis")
    st.write("Upload an ECG image for diagnosis")

    # Uploading ECG image
    uploaded_file = st.file_uploader("Choose an ECG image...", type="jpg")
    if uploaded_file is not None:
        # Display uploaded image
        image = Image.open(uploaded_file)
        st.image(image, caption='Uploaded ECG Image', use_column_width=True)

        # Analyze the ECG image when the user clicks the button
        if st.button("Analyze"):
            with st.spinner("Analyzing..."):
                # Call the analysis function and display the result
                result = analyze_ecg_image(uploaded_file)
                st.write("Analysis Result:")
                st.write(result)

elif selected_option == "Patient Reports":
    st.title("Patient Reports")
    st.write("This section displays a list of patient reports.")

    # Create a container for the reports
    with st.container():
        st.markdown(
            """
            <div style='border: 2px solid #1E90FF; border-radius: 5px; padding: 10px;'>
                <h4>Reports List</h4>
            </div>
            """, unsafe_allow_html=True)

        # Display each report in a structured format
        for report in patient_reports:
            st.markdown(
                f"""
                <div style='border: 1px solid #1E90FF; border-radius: 5px; padding: 10px; margin-top: 10px;'>
                    <p><strong>Patient Name:</strong> {report['patient_name']}</p>
                    <p><strong>Report Date:</strong> {report['report_date']}</p>
                    <p><strong>Diagnosis:</strong> {report['diagnosis']}</p>
                </div>
                """, unsafe_allow_html=True)

elif selected_option == "Patients":
    st.title("Patients")
    st.write("This section will display a list of patients.")
    st.write("You can add functionality to add, edit, or remove patients here.")

elif selected_option == "Settings":
    st.title("Settings")

    # Create a section to update profile information
    st.subheader("Update Profile Information")
    with st.form("profile_form"):
        username = st.text_input("Name", value="Doctor Gilbert")
        email = st.text_input("Email", value="doctor.gilbert@example.com")
        submit_button = st.form_submit_button("Update Profile")

        if submit_button:
            st.success("Profile updated successfully!")

    # Create a section to change the application theme
    st.subheader("Change Application Theme")
    theme_options = ["Light", "Dark"]
    selected_theme = st.selectbox("Select Theme", theme_options)

    if st.button("Apply Theme"):
        st.success(f"{selected_theme} theme applied!")

