document.addEventListener('DOMContentLoaded', function() {
    // Create modals for each article
    const articles = document.querySelectorAll('.news-item');
    articles.forEach((article, index) => {
        const modalId = `modal-${index}`;
        const modalHTML = `
            <div id="${modalId}" class="modal">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h2>${article.querySelector('h3').textContent}</h2>
                    <p class="press-meta">${article.querySelector('.news-date').textContent}</p>
                    <div class="press-content">
                        ${getArticleContent(article.querySelector('h3').textContent)}
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add click handler to the article's read more button
        const readMoreBtn = article.querySelector('.read-more');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById(modalId).style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Handle the "Read Full Statement" button separately
    const pressModal = document.getElementById('pressModal');
    const openPressBtn = document.querySelector('.open-modal');
    if (openPressBtn) {
        openPressBtn.addEventListener('click', function(e) {
            e.preventDefault();
            pressModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close button handlers for all modals
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    // Click outside to close for all modals
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Escape key handler for all modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    });
});

// Function to get content based on article title
function getArticleContent(title) {
    const contents = {
        "Humanitarian Aid Reaches Gaza Communities": `
            <p>In a significant development for humanitarian efforts in Gaza, a substantial shipment of critical medical supplies and food aid has successfully reached communities in dire need. This breakthrough in aid delivery comes after weeks of intensive coordination between international organizations and local partners.</p>
            
            <h3>Aid Distribution Details</h3>
            <p>The latest delivery includes:</p>
            <ul>
                <li>Emergency medical supplies for local hospitals</li>
                <li>Essential food packages for 5,000 families</li>
                <li>Clean water and sanitation equipment</li>
                <li>Emergency shelter materials</li>
            </ul>
            
            <h3>Impact and Reach</h3>
            <p>This aid shipment is expected to provide immediate relief to over 20,000 individuals in various areas of Gaza. Local healthcare facilities will receive much-needed medical supplies, while families will receive essential food and hygiene items.</p>
            
            <h3>Coordination Efforts</h3>
            <p>The successful delivery was made possible through:</p>
            <ul>
                <li>Collaboration with multiple international aid organizations</li>
                <li>Support from local community leaders</li>
                <li>Coordinated logistics operations</li>
                <li>24/7 monitoring and distribution management</li>
            </ul>
            
            <p>For more information about our humanitarian aid efforts or to contribute to future shipments, please contact our aid coordination team at aid@palestinesolidarity.org</p>
        `,
        "Upcoming Peace Rally in City Center": `
            <p>Join us for a powerful demonstration of solidarity and support for Palestinian rights at our upcoming peace rally in City Center Square. This event aims to raise awareness and advocate for immediate humanitarian action.</p>
            
            <h3>Event Details</h3>
            <ul>
                <li>Date: January 25, 2024</li>
                <li>Time: 2:00 PM - 5:00 PM</li>
                <li>Location: City Center Square</li>
                <li>Expected Attendance: 1000+ participants</li>
            </ul>
            
            <h3>Rally Program</h3>
            <p>The event will feature:</p>
            <ul>
                <li>Keynote speakers from humanitarian organizations</li>
                <li>Personal testimonies from affected families</li>
                <li>Cultural performances</li>
                <li>Information booths and resource centers</li>
            </ul>
            
            <h3>How to Participate</h3>
            <p>We welcome all peaceful participants who wish to show their support. Please:</p>
            <ul>
                <li>Register in advance through our website</li>
                <li>Bring appropriate signs and banners</li>
                <li>Follow event marshals' guidance</li>
                <li>Share the event with your networks</li>
            </ul>
            
            <p>For registration and more information, please contact events@palestinesolidarity.org</p>
        `,
        "Statement on Recent Developments": `
            <p>This press release addresses the recent developments in the ongoing humanitarian situation and outlines our organization's response to the evolving crisis.</p>
            
            <h3>Recent Developments</h3>
            <p>Key updates on the current situation:</p>
            <ul>
                <li>Increased humanitarian needs in affected areas</li>
                <li>New challenges in aid delivery</li>
                <li>Growing international concern</li>
                <li>Emerging support initiatives</li>
            </ul>
            
            <h3>Our Response</h3>
            <p>We are implementing the following measures:</p>
            <ul>
                <li>Scaling up emergency response operations</li>
                <li>Enhancing coordination with international partners</li>
                <li>Launching new support programs</li>
                <li>Increasing advocacy efforts</li>
            </ul>
            
            <h3>Call to Action</h3>
            <p>We urge all stakeholders to:</p>
            <ul>
                <li>Support humanitarian access</li>
                <li>Contribute to relief efforts</li>
                <li>Raise awareness</li>
                <li>Advocate for peaceful resolution</li>
            </ul>
            
            <p>For media inquiries, please contact press@palestinesolidarity.org</p>
        `,
        "New Education Initiative Launched": `
            <p>We are proud to announce the launch of our new education initiative aimed at supporting Palestinian students and ensuring continued access to quality education despite current challenges.</p>
            
            <h3>Program Overview</h3>
            <p>The initiative includes:</p>
            <ul>
                <li>Online learning platforms</li>
                <li>Educational resource distribution</li>
                <li>Teacher training programs</li>
                <li>Student support services</li>
            </ul>
            
            <h3>Implementation Plan</h3>
            <p>The program will be rolled out in phases:</p>
            <ul>
                <li>Phase 1: Digital infrastructure setup</li>
                <li>Phase 2: Content development and translation</li>
                <li>Phase 3: Teacher training</li>
                <li>Phase 4: Student enrollment and support</li>
            </ul>
            
            <h3>Impact Goals</h3>
            <p>We aim to achieve:</p>
            <ul>
                <li>Support for 10,000 students in the first year</li>
                <li>Training for 500 teachers</li>
                <li>Development of 1,000+ educational resources</li>
                <li>Establishment of 20 learning centers</li>
            </ul>
            
            <p>To learn more about our education initiative or to contribute, please contact education@palestinesolidarity.org</p>
        `
    };
    
    return contents[title] || '<p>Content coming soon...</p>';
}
