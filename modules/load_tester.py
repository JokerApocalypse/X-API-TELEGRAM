import requests
import time
import random
import logging

# Configuration des logs
logging.basicConfig(
    filename="attack_logs.txt",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

def load_test(url, phone_number, attack_type, request_count, burst=False):
    """
    Simule un test de charge avec plusieurs requêtes simultanées.
    :param url: L'URL cible.
    :param phone_number: Numéro à cibler.
    :param attack_type: Type d'attaque.
    :param request_count: Nombre de requêtes.
    :param burst: Si True, toutes les requêtes sont envoyées en parallèle.
    """
    for i in range(request_count):
        try:
            payload = {"phone_number": phone_number, "attack_type": attack_type, "attempt": i + 1}
            response = requests.post(url, json=payload)
            logging.info(f"Tentative #{i+1}: Statut {response.status_code}")
            if not burst:
                time.sleep(random.uniform(0.5, 1.5))  # Pause aléatoire entre les requêtes
        except Exception as e:
            logging.error(f"Tentative #{i+1}: Erreur {e}")
