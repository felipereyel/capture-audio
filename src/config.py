import os, pathlib
from dotenv import load_dotenv
from dataclasses import dataclass

load_dotenv(".env.dev")

@dataclass
class Config:
    target_url: str
    files_path: pathlib.Path
    selenium_command_executor: str

def get_config() -> Config:
    target_url = os.environ["TARGET_URL"]
    files_dir = os.environ["FILES_DIR"]
    files_path = pathlib.Path(files_dir)
    files_path.mkdir(parents=True, exist_ok=True)
    selenium_command_executor = os.environ["SELENIUM_STANDALONE_URL"] + "/wd/hub"
    
    return Config(
        target_url=target_url,
        files_path=files_path,
        selenium_command_executor=selenium_command_executor,
    )