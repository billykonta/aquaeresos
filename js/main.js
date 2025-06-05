document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.8)';
        }
    });

    // Add animation to menu items when they come into view
    const menuItems = document.querySelectorAll('.menu-category');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-out';
        observer.observe(item);
    });

    // Get the button and the menu category selector div
    const categoryToggleBtn = document.getElementById('menu-category-toggle');
    const categorySelectorDiv = document.getElementById('menu-category-selector');

    // Add click event listener to the toggle button
    categoryToggleBtn.addEventListener('click', function() {
        // Toggle the display of the category selector div
        if (categorySelectorDiv.style.display === 'flex') {
            categorySelectorDiv.style.display = 'none';
        } else {
            categorySelectorDiv.style.display = 'flex'; // Use flex to maintain column layout
        }
    });

    // Add click event listeners to the category links in the popup
    document.querySelectorAll('#menu-category-selector a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior
            
            const targetId = this.getAttribute('href');
            // Escape spaces in the targetId for use in querySelector
            const escapedTargetId = targetId.replace(/ /g, '\\ ');
            
            const targetElement = document.querySelector(escapedTargetId);
            
            if (targetElement) {
                // Get the position of the target element and the height of the fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - navbarHeight - 20; // Subtract navbar height and a little extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Hide the popup after scrolling
                categorySelectorDiv.style.display = 'none';
            }
        });
    });

    // Close category selector when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideSelector = categorySelectorDiv.contains(event.target);
        const isClickOnToggleButton = categoryToggleBtn.contains(event.target);

        // If the selector is visible and the click is NOT inside the selector AND NOT on the toggle button
        if (categorySelectorDiv.style.display === 'flex' && !isClickInsideSelector && !isClickOnToggleButton) {
            categorySelectorDiv.style.display = 'none';
        }
    });

    // Add click event listener to the logo to scroll to the hero section
    const logo = document.querySelector('.nav-logo'); // Assuming your logo is inside a div with class 'nav-logo'
    if (logo) {
        logo.style.cursor = 'pointer'; // Indicate it's clickable
        logo.addEventListener('click', () => {
            const heroSection = document.getElementById('home');
            if (heroSection) {
                 // Calculate the offset to account for the fixed navbar
                 const navbarHeight = document.querySelector('.navbar').offsetHeight;
                 const targetPosition = heroSection.getBoundingClientRect().top + window.scrollY;
                 const offsetPosition = targetPosition - navbarHeight; // Adjust based on your layout needs

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Language Switching ---

    // Translations object (English as default, Greek translations added)
    const translations = {
        en: {
            "hero-heading": "Welcome to AQUA",
            "hero-description": "Your perfect beach destination for drinks, cocktails, and delicious food",
            "about-heading": "About AQUA",
            "about-text": "Aqua is more than just a beach canteen—it's a dream brought to life by two 19-year-old friends with a passion for creating the ultimate seaside experience. With a focus on quality, refreshing flavors, and a vibrant atmosphere, we strive to offer our customers the perfect mix of relaxation and enjoyment by the water. Whether you're here for a cold drink, a delicious snack, or just good vibes under the sun, Aqua is the place to be. Join us and make every beach day unforgettable!",
            "menu-heading": "Our Menu",
            "menu-category-toggle": "Select Category",
            "menu-cat-coffee": "Coffee",
            "menu-cat-refreshing": "Refreshing Drinks",
            "menu-cat-cocktails": "Cocktails",
            "menu-cat-food": "Food",
            "menu-cat-big-players": "For The Big Players",
            // Coffee Menu Items
            "menu-item-coffee-espresso": "Espresso",
            "menu-item-coffee-cappuccino": "Cappuccino",
            "menu-item-coffee-freddo-espresso": "Freddo Espresso",
            "menu-item-coffee-freddo-cappuccino": "Freddo Cappuccino",
            "menu-item-coffee-frappe": "Frappe",
            "menu-item-coffee-iced-latte": "Iced Latte",
            // Refreshing Drinks Menu Items
            "menu-item-refreshing-lemonade": "Homemade Lemonade",
            "menu-desc-refreshing-lemonade": "",
            "menu-item-refreshing-orange-juice": "Fresh Orange Juice",
             "menu-desc-refreshing-orange-juice": "",
            "menu-item-refreshing-smoothie": "Mixed Juice Smoothie",
            "menu-desc-refreshing-smoothie-1": "pineapple, banana, coconut .",
            "menu-desc-refreshing-smoothie-2": "strawberry, peach, mango .",
            "menu-desc-refreshing-smoothie-3": "strawberry,cranberry, blueberry .",
            "menu-item-refreshing-cold-chocolate": "Cold Chocolate",
            "menu-desc-refreshing-cold-chocolate": "",
            "menu-item-refreshing-milkshake": "Milkshake",
            "menu-desc-refreshing-milkshake": "Creamy vanilla ice cream with your choice of flavor.",
            "menu-item-refreshing-granita": "Granita",
            "menu-desc-refreshing-granita": "strawberrie, mango, pineapple, cococnut, watermelon.",
            // Cocktails Menu Items
            "menu-item-cocktails-mojito": "Mojito",
            "menu-item-cocktails-caipirinha": "Caipirinha",
            "menu-item-cocktails-aperol-spritz": "Aperol Spritz",
            "menu-item-cocktails-sex-on-the-beach": "Sex on the Beach",
            "menu-item-cocktails-daiquiri": "Daiquiri",
            "menu-item-cocktails-granita": "Cocktail Granita",
            "menu-desc-cocktails-granita": "you choose your alcohol and granita preferances.",
            "menu-item-cocktails-non-alcohol": "Non Alcohol Cocktail",
            // Food Menu Items
            "menu-item-food-sandwich": "Sandwich",
            "menu-desc-food-sandwich": "ham, cheese, lettuce, tomao, mayo.",
            "menu-item-food-chicken-sandwich": "Chicken Sandwich",
            "menu-desc-food-chicken-sandwich": "cheese, lettuce, tomao, mayo, chicken nuggets.",
            "menu-item-food-toast": "Toast",
            "menu-desc-food-toast": "",
            "menu-item-food-club-sandwich": "Club Sandwich",
            "menu-desc-food-club-sandwich": "ham, cheese, lettuce, tomao, mayo.",
            "menu-item-food-chicken-club-sandwich": "Chicken Club Sandwich",
            "menu-desc-food-chicken-club-sandwich": "cheese, lettuce, tomao, mayo, chicken nuggets.",
            "menu-item-food-chicken-tortilla": "Chicken Tortilla",
            "menu-desc-food-chicken-tortilla": "cheese, lettuce, tomao, sauce, chicken nuggets.",
            "menu-item-food-sausage-tortilla": "Sausage Tortilla",
            "menu-desc-food-sausage-tortilla": "cheese, sauce, sausage",
            "menu-item-food-burger": "Burger",
            "menu-desc-food-burger": "beef, cheese, bacon, lettuce, tomato, sauce.",
            "menu-item-food-greek-salad": "Greek Salad",
            "menu-desc-food-greek-salad": "tomato, cucumber, onion, feta, olive oil.",
            "menu-item-food-crepe": "Crepe",
            "menu-desc-food-crepe": "ham, cheese, lettuce, tomao, mayo.",
            "menu-item-food-chicken-crepe": "Chicken Crepe",
            "menu-desc-food-chicken-crepe": "ham, cheese, lettuce, tomao, mayo, chicken nuggets.",
            "menu-item-food-sausage-crepe": "Sausage Crepe",
            "menu-desc-food-sausage-crepe": "cheese, sauce, tomato, lettuce, sausage.",
            "menu-item-food-sweet-crepe": "Swewt crepe",
            "menu-desc-food-sweet-crepe": "chocolate, biscuit.",
            "menu-item-food-ice-cream-crepe": "Ice Cream Crepe",
            "menu-desc-food-ice-cream-crepe": "chocolate, biscuit, ice cream of your choise.",
            // For The Big Players Menu Items
            "menu-item-big-players-gin": "Gin Bottle",
            "menu-item-big-players-vodka": "Vodka Bottle",
            "menu-item-big-players-tequila": "Tequila Bottle",
            "menu-item-big-players-premium-vodka": "Premium Vodka",
            "menu-item-big-players-shisha": "Shisha",
            "menu-desc-big-players-shisha": "ask for the days flavors.",
            // Contact Info
            "contact-heading": "Contact Us",
            "contact-hours": "Open Daily: 9:00 AM - 12:00 AM",
            "contact-phone": "+30 6973767325",
            "contact-location": "Skala Eresos, Greece",
            "contact-instagram": "Instagram", // Text inside the link
            // Team Section
            "team-heading": "Be a part of our team",
            // Footer
            "footer-copyright": "&copy; 2024 Aqua . All rights reserved.",
            "footer-developer": "&lt;/&gt; KAD Development" // Text inside the link
        },
        gr: {
            "hero-heading": "Καλώς ήρθατε στο AQUA",
            "hero-description": "Ο ιδανικός παραθαλάσσιος προορισμός σας για ποτά, κοκτέιλ και νόστιμο φαγητό",
            "about-heading": "Σχετικά με το AQUA",
            "about-text": "Το Aqua είναι κάτι παραπάνω από μια απλή καντίνα στην παραλία - είναι ένα όνειρο που έγινε πραγματικότητα από δύο 19χρονους φίλους με πάθος για τη δημιουργία της απόλυτης εμπειρίας δίπλα στη θάλασσα. Με έμφαση στην ποιότητα, τις δροσιστικές γεύσεις και μια ζωντανή ατμόσφαιρα, προσπαθούμε να προσφέρουμε στους πελάτες μας τον τέλειο συνδυασμό χαλάρωσης και απόλαυσης δίπλα στο νερό. Είτε είστε εδώ για ένα κρύο ποτό, ένα νόστιμο σνακ, είτε απλώς για καλή διάθεση κάτω από τον ήλιο, το Aqua είναι το μέρος που πρέπει να είστε. Ελάτε μαζί μας και κάντε κάθε μέρα στην παραλία αξέχαστη!",
            "menu-heading": "Ο Κατάλογός μας",
            "menu-category-toggle": "Επιλογή Κατηγορίας",
            "menu-cat-coffee": "Καφέδες",
            "menu-cat-refreshing": "Δροσιστικά Ποτά",
            "menu-cat-cocktails": "Κοκτέιλ",
            "menu-cat-food": "Φαγητό",
            "menu-cat-big-players": "Για τους Μεγάλους Παίκτες",
            // Coffee Menu Items (Greek Translations)
            "menu-item-coffee-espresso": "Εσπρέσο",
            "menu-item-coffee-cappuccino": "Καπουτσίνο",
            "menu-item-coffee-freddo-espresso": "Φρέντο Εσπρέσο",
            "menu-item-coffee-freddo-cappuccino": "Φρέντο Καπουτσίνο",
            "menu-item-coffee-frappe": "Φραπέ",
            "menu-item-coffee-iced-latte": "Iced Latte",
            // Refreshing Drinks Menu Items (Greek Translations)
            "menu-item-refreshing-lemonade": "Σπιτική Λεμονάδα",
            "menu-desc-refreshing-lemonade": "",
            "menu-item-refreshing-orange-juice": "Φρέσκος Χυμός Πορτοκάλι",
            "menu-desc-refreshing-orange-juice": "",
            "menu-item-refreshing-smoothie": "Ανάμεικτο Smoothie",
            "menu-desc-refreshing-smoothie-1": "ανανάς, μπανάνα, καρύδα .",
            "menu-desc-refreshing-smoothie-2": "φράουλα, ροδάκινο, μάνγκο .",
            "menu-desc-refreshing-smoothie-3": "φράουλα, κράνμπερι, μύρτιλο .",
            "menu-item-refreshing-cold-chocolate": "Κρύα Σοκολάτα",
             "menu-desc-refreshing-cold-chocolate": "",
            "menu-item-refreshing-milkshake": "Milkshake",
            "menu-desc-refreshing-milkshake": "Κρεμώδες παγωτό βανίλια με γεύση της επιλογής σας.",
            "menu-item-refreshing-granita": "Γρανίτα",
            "menu-desc-refreshing-granita": "φράουλα, μάνγκο, ανανάς, καρύδα, καρπούζι.",
            // Cocktails Menu Items (Greek Translations)
            "menu-item-cocktails-mojito": "Μοχίτο",
            "menu-item-cocktails-caipirinha": "Caipirinha",
            "menu-item-cocktails-aperol-spritz": "Aperol Spritz",
            "menu-item-cocktails-sex-on-the-beach": "Sex on the Beach",
            "menu-item-cocktails-daiquiri": "Daiquiri",
            "menu-item-cocktails-granita": "Κοκτέιλ Γρανίτα",
            "menu-desc-cocktails-granita": "επιλέγετε το αλκοόλ και τις προτιμήσεις γρανίτας.",
            "menu-item-cocktails-non-alcohol": "Κοκτέιλ Χωρίς Αλκοόλ",
            // Food Menu Items (Greek Translations)
            "menu-item-food-sandwich": "Σάντουιτς",
            "menu-desc-food-sandwich": "ζαμπόν, τυρί, μαρούλι, ντομάτα, μαγιονέζα.",
            "menu-item-food-chicken-sandwich": "Σάντουιτς Κοτόπουλο",
            "menu-desc-food-chicken-sandwich": "τυρί, μαρούλι, ντομάτα, μαγιονέζα, κοτομπουκιές.",
            "menu-item-food-toast": "Τοστ",
            "menu-desc-food-toast": "",
            "menu-item-food-club-sandwich": "Club Σάντουιτς",
            "menu-desc-food-club-sandwich": "ζαμπόν, τυρί, μαρούλι, ντομάτα, μαγιονέζα.",
            "menu-item-food-chicken-club-sandwich": "Club Σάντουιτς Κοτόπουλο",
            "menu-desc-food-chicken-club-sandwich": "τυρί, μαρούλι, ντομάτα, μαγιονέζα, κοτομπουκιές.",
            "menu-item-food-chicken-tortilla": "Τορτίγια Κοτόπουλο",
            "menu-desc-food-chicken-tortilla": "τυρί, μαρούλι, ντομάτα, σως, κοτομπουκιές.",
            "menu-item-food-sausage-tortilla": "Τορτίγια Λουκάνικο",
            "menu-desc-food-sausage-tortilla": "τυρί, σως, λουκάνικο",
            "menu-item-food-burger": "Μπέργκερ",
            "menu-desc-food-burger": "μπιφτέκι, τυρί, μπέικον, μαρούλι, ντομάτα, σως.",
            "menu-item-food-greek-salad": "Ελληνική Σαλάτα",
            "menu-desc-food-greek-salad": "ντομάτα, αγγούρι, κρεμμύδι, φέτα, ελαιόλαδο.",
            "menu-item-food-crepe": "Κρέπα",
            "menu-desc-food-crepe": "ζαμπόν, τυρί, μαρούλι, ντομάτα, μαγιονέζα.",
            "menu-item-food-chicken-crepe": "Κρέπα Κοτόπουλο",
            "menu-desc-food-chicken-crepe": "ζαμπόν, τυρί, μαρούλι, ντομάτα, μαγιονέζα, κοτομπουκιές.",
            "menu-item-food-sausage-crepe": "Κρέπα Λουκάνικο",
            "menu-desc-food-sausage-crepe": "τυρί, σως, ντομάτα, μαρούλι, λουκάνικο.",
            "menu-item-food-sweet-crepe": "Γλυκιά Κρέπα",
            "menu-desc-food-sweet-crepe": "σοκολάτα, μπισκότο.",
            "menu-item-food-ice-cream-crepe": "Κρέπα Παγωτό",
            "menu-desc-food-ice-cream-crepe": "σοκολάτα, μπισκότο, παγωτό της επιλογής σας.",
            // For The Big Players Menu Items (Greek Translations)
            "menu-item-big-players-gin": "Μπουκάλι Gin",
            "menu-item-big-players-vodka": "Μπουκάλι Vodka",
            "menu-item-big-players-tequila": "Μπουκάλι Tequila",
            "menu-item-big-players-premium-vodka": "Premium Vodka",
            "menu-item-big-players-shisha": "Ναργιλές",
            "menu-desc-big-players-shisha": "ρωτήστε για τις γεύσεις της ημέρας.",
            // Contact Info (Greek Translations)
            "contact-heading": "Επικοινωνία",
            "contact-hours": "Ανοιχτά Καθημερινά: 9:00 π.μ. - 12:00 π.μ.",
            "contact-phone": "+30 6973767325",
            "contact-location": "Σκάλα Ερεσού, Ελλάδα",
            "contact-instagram": "Instagram", // Text inside the link
            // Team Section (Greek Translations)
            "team-heading": "Γίνετε μέλος της ομάδας μας",
            // Footer (Greek Translations)
            "footer-copyright": "&copy; 2024 Aqua . Με επιφύλαξη κάθε δικαιώματος.",
            "footer-developer": "&lt;/&gt; KAD Development" // Text inside the link
        }
    };

    // Function to update content based on selected language
    function updateContent(language) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
    }

    // Add click event listeners to language buttons
    document.querySelectorAll('.lang-button').forEach(button => {
        button.addEventListener('click', () => {
            const language = button.getAttribute('data-lang');
            updateContent(language);
            localStorage.setItem('selectedLanguage', language);
        });
    });

    // Load saved language preference or default to English
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    updateContent(savedLanguage);
});
