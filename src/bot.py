import sys, time, requests
from selenium import webdriver 
from selenium.webdriver.firefox.options import Options

from .config import get_config

def wait_for_remote(command_executor: str):
    print('Waiting for remote webdriver...')
    
    for i in range(20):
        try:
            time.sleep(5)
            r = requests.get(command_executor + '/status')
            r.raise_for_status()
            
            if r.json()['value']['ready']:
                print('Remote webdriver is ready')
                return
        except:
            pass
    else:
        print('Remote webdriver is not ready - timeout')
        sys.exit(1)

def main():
    config = get_config()
    
    wait_for_remote(config.selenium_command_executor)
    
    options=Options()
    with webdriver.Remote(command_executor=config.selenium_command_executor, options=options) as driver:
        print(f'Navigating to {config.target_url}')
        driver.get(config.target_url)
        
        print('Taking screenshot')
        driver.save_screenshot(f'{config.files_path}/screenshot.png')
    
if __name__ == "__main__":
    main()