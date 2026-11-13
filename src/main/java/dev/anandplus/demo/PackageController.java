package dev.anandplus.demo;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://webdevelopment-backend-production.up.railway.app")
public class PackageController {
    public record WebsitePackage(String id, String category, String slug, String name, String description,
            int price, int pages, int days, List<String> features, String accent, String icon, String image) {}
    public record CartItem(WebsitePackage product, int quantity) {}
    public record ContactRequest(String name, String email, String message) {}
    public record AuthRequest(String name, String email, String password) {}

    private static final List<WebsitePackage> PACKAGES = List.of(
        new WebsitePackage("ecommerce-powerhouse","E-Commerce","ecommerce","E-Commerce Powerhouse","Full-stack e-commerce platform with multi-vendor support, order tracking, coupons, reviews and inventory. Scales to thousands of SKUs.",699,14,18,List.of("Product catalog","Secure checkout","Inventory & orders"),"from-cyan-400/30 via-blue-500/20 to-indigo-500/30","store","https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800"),
        new WebsitePackage("saas-launch-kit","SaaS","software","SaaS Launch Kit","Complete SaaS marketing site + application shell with pricing, auth, dashboard, subscription billing and docs. Ship your product in days, not months.",599,10,12,List.of("Pricing tables","Auth & billing","Admin dashboard"),"from-violet-400/35 via-fuchsia-500/20 to-blue-500/25","layers","https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"),
        new WebsitePackage("hospital-clinic-suite","Hospital","hospital","Hospital & Clinic Suite","Modern hospital website with doctor directory, online appointment booking, department pages, patient portal and emergency contact — HIPAA-friendly architecture.",499,12,14,List.of("Appointment booking","Doctor profiles","Departments"),"from-emerald-400/25 via-cyan-500/20 to-blue-500/30","hospital","https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800"),
        new WebsitePackage("clothing-store-pro","Clothing","clothing","Clothing Store Pro","A stunning fashion e-commerce storefront with product filtering, wishlist, size guide, and lightning-fast checkout. Perfect for boutiques and premium clothing brands.",299,8,10,List.of("Product catalog","Wishlist","Size guide"),"from-rose-400/30 via-orange-400/20 to-violet-500/25","shirt","https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"),
        new WebsitePackage("education-course-platform","Education","education","Education & Course Platform","LMS-style education site with courses, instructors, student dashboard, quizzes and certificates. Monetize knowledge beautifully.",549,11,15,List.of("Courses","Instructors","Quizzes & certificates"),"from-amber-300/30 via-orange-500/20 to-pink-500/25","book","https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"),
        new WebsitePackage("corporate-showcase","Corporate","corporate","Corporate Showcase","Clean, authoritative corporate website with team pages, services, case studies and investor section — built to convert enterprise visitors.",249,7,8,List.of("Team","Case studies","Investor relations"),"from-sky-300/30 via-indigo-500/20 to-violet-500/25","building","https://images.unsplash.com/photo-1497366216548-37526070297c?w=800")
    );
    private final Map<String, Integer> cart = new ConcurrentHashMap<>();
    private final AtomicInteger submissions = new AtomicInteger();

    @GetMapping("/packages")
    public List<WebsitePackage> packages(@RequestParam(required=false) String category, @RequestParam(required=false) String search) {
        return PACKAGES.stream().filter(p -> category == null || category.isBlank() || category.equalsIgnoreCase("All") || p.category().equalsIgnoreCase(category))
          .filter(p -> search == null || search.isBlank() || (p.name()+" "+p.description()+" "+p.category()).toLowerCase().contains(search.toLowerCase())).collect(Collectors.toList());
    }

    @GetMapping("/packages/{id}")
    public ResponseEntity<?> packageById(@PathVariable String id) {
        return PACKAGES.stream().filter(p -> p.id().equals(id)).findFirst().<ResponseEntity<?>>map(ResponseEntity::ok)
          .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message","Package not found")));
    }

    @GetMapping("/cart")
    public Map<String,Object> getCart() {
        List<CartItem> items = cart.entrySet().stream().map(entry -> new CartItem(PACKAGES.stream().filter(p -> p.id().equals(entry.getKey())).findFirst().orElseThrow(), entry.getValue())).toList();
        int count = items.stream().mapToInt(CartItem::quantity).sum();
        int total = items.stream().mapToInt(item -> item.product().price()*item.quantity()).sum();
        return Map.of("items",items,"count",count,"total",total);
    }

    @PostMapping("/cart/items")
    public ResponseEntity<?> addToCart(@RequestBody Map<String,String> body) {
        WebsitePackage product = PACKAGES.stream().filter(p -> p.id().equals(body.get("packageId"))).findFirst().orElse(null);
        if (product == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message","Package not found"));
        cart.merge(product.id(),1,Integer::sum);
        int count = cart.values().stream().mapToInt(Integer::intValue).sum();
        return ResponseEntity.ok(Map.of("count",count,"message",product.name()+" added to your cart"));
    }

    @PostMapping("/contact")
    public ResponseEntity<?> contact(@RequestBody ContactRequest request) {
        if (request.name()==null || request.email()==null || request.message()==null || request.message().length()<10)
            return ResponseEntity.badRequest().body(Map.of("message","Please provide your name, email, and a message of at least 10 characters."));
        submissions.incrementAndGet();
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message","Thanks "+request.name()+" — your message is on its way to our studio.","received",true));
    }

    @PostMapping({"/auth/signin", "/auth/register"})
    public ResponseEntity<?> demoAuth(@RequestBody AuthRequest request) {
        if (request.email()==null || request.password()==null || request.email().isBlank() || request.password().isBlank())
            return ResponseEntity.badRequest().body(Map.of("message","Please provide an email and password."));
        return ResponseEntity.ok(Map.of("token","demo-session-token","user",Map.of("name",request.name()==null?request.email().split("@")[0]:request.name(),"email",request.email()),"demo",true));
    }
}
