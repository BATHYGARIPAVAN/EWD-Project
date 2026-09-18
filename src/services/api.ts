import { User, Course, Enrollment, ContactSubmission, AppointmentBooking, ShopProduct, ShopOrder, Testimonial, NewsletterSubscriber, BlogPost } from '../types';

const API_BASE = '/api';

export const api = {
  // Auth
  async login(credentials: { email: string; password: string; role?: 'USER' | 'ADMIN' }): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  async register(
    userDataOrName: string | Partial<User>,
    email?: string,
    password?: string,
    role: 'USER' | 'ADMIN' = 'USER',
    extra?: Partial<User>
  ): Promise<{ user: User; token: string }> {
    let payload: any;
    if (typeof userDataOrName === 'object') {
      payload = userDataOrName;
    } else {
      payload = {
        name: userDataOrName,
        email,
        password,
        role,
        ...extra
      };
    }
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    return data;
  },

  async updateProfile(idOrData: string | Partial<User>, data?: Partial<User>): Promise<{ user: User; message: string }> {
    let payload: any;
    if (typeof idOrData === 'string') {
      payload = { id: idOrData, ...data };
    } else {
      payload = idOrData;
    }
    const res = await fetch(`${API_BASE}/auth/profile/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const resData = await res.json();
    if (!res.ok) throw new Error(resData.error || 'Profile update failed');
    return resData;
  },

  async getAllUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/auth/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async deleteUser(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/auth/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete user');
  },

  // Courses
  async getCourses(): Promise<Course[]> {
    const res = await fetch(`${API_BASE}/courses`);
    if (!res.ok) throw new Error('Failed to load courses');
    return res.json();
  },

  async createCourse(course: Partial<Course>): Promise<{ course: Course; message: string }> {
    const res = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create course');
    return data;
  },

  async updateCourse(id: string, course: Partial<Course>): Promise<{ course: Course; message: string }> {
    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update course');
    return data;
  },

  async deleteCourse(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/courses/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete course');
  },

  // Enrollments
  async getEnrollments(email?: string): Promise<Enrollment[]> {
    const url = email ? `${API_BASE}/enrollments?email=${encodeURIComponent(email)}` : `${API_BASE}/enrollments`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch enrollments');
    return res.json();
  },

  async createEnrollment(enrollmentData: Partial<Enrollment>): Promise<{ enrollment: Enrollment; message: string }> {
    const res = await fetch(`${API_BASE}/enrollments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enrollmentData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Enrollment failed');
    return data;
  },

  async updateEnrollment(id: string, updates: Partial<Enrollment>): Promise<{ enrollment: Enrollment }> {
    const res = await fetch(`${API_BASE}/enrollments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update enrollment');
    return data;
  },

  async deleteEnrollment(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/enrollments/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete enrollment');
  },

  // Contacts
  async getContacts(): Promise<ContactSubmission[]> {
    const res = await fetch(`${API_BASE}/contacts`);
    if (!res.ok) throw new Error('Failed to load contacts');
    return res.json();
  },

  async submitContact(contactData: Partial<ContactSubmission>): Promise<{ contact: ContactSubmission; message: string }> {
    const res = await fetch(`${API_BASE}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit contact inquiry');
    return data;
  },

  async updateContact(id: string, updates: Partial<ContactSubmission>): Promise<{ contact: ContactSubmission }> {
    const res = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update contact');
    return data;
  },

  async deleteContact(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/contacts/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete contact');
  },

  // Appointments
  async getAppointments(): Promise<AppointmentBooking[]> {
    const res = await fetch(`${API_BASE}/appointments`);
    if (!res.ok) throw new Error('Failed to fetch appointments');
    return res.json();
  },

  async bookAppointment(bookingData: Partial<AppointmentBooking>): Promise<{ appointment: AppointmentBooking; message: string }> {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Appointment booking failed');
    return data;
  },

  async updateAppointment(id: string, updates: Partial<AppointmentBooking>): Promise<{ appointment: AppointmentBooking }> {
    const res = await fetch(`${API_BASE}/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update appointment');
    return data;
  },

  async deleteAppointment(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/appointments/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete appointment');
  },

  // Products & Orders
  async getProducts(): Promise<ShopProduct[]> {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  },

  async getOrders(email?: string): Promise<ShopOrder[]> {
    const url = email ? `${API_BASE}/orders?email=${encodeURIComponent(email)}` : `${API_BASE}/orders`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  async createOrder(orderData: Partial<ShopOrder>): Promise<{ order: ShopOrder; message: string }> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Order placement failed');
    return data;
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    const res = await fetch(`${API_BASE}/testimonials`);
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
  },

  async submitTestimonial(testimonial: Partial<Testimonial>): Promise<{ testimonial: Testimonial; message: string }> {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit testimonial');
    return data;
  },

  async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<{ testimonial: Testimonial }> {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update testimonial');
    return data;
  },

  async deleteTestimonial(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete testimonial');
  },

  // Newsletter
  async getNewsletter(): Promise<NewsletterSubscriber[]> {
    const res = await fetch(`${API_BASE}/newsletter`);
    if (!res.ok) {
      // Fallback or empty if not available
      return [];
    }
    return res.json();
  },

  async subscribeNewsletter(email: string): Promise<{ subscriber: NewsletterSubscriber; message: string }> {
    const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Newsletter subscription failed');
    return data;
  },

  // Blogs (Add, Edit, Delete, Fetch)
  async getBlogs(): Promise<BlogPost[]> {
    const res = await fetch(`${API_BASE}/blogs`);
    if (!res.ok) throw new Error('Failed to load blog posts');
    return res.json();
  },

  async createBlog(blog: Partial<BlogPost>): Promise<{ blog: BlogPost; message: string }> {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create blog post');
    return data;
  },

  async updateBlog(id: string, blog: Partial<BlogPost>): Promise<{ blog: BlogPost; message: string }> {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update blog post');
    return data;
  },

  async deleteBlog(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/blogs/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete blog post');
  },

  // Live Excel Sheets Viewer & Modifier
  async getExcelSheets(): Promise<{ filePath: string; fileSize: string; totalSheets: number; sheets: any[] }> {
    const res = await fetch(`${API_BASE}/excel/sheets`);
    if (!res.ok) throw new Error('Failed to load raw Excel data');
    return res.json();
  },

  async updateExcelCell(sheetName: string, rowNumber: number, columnKey: string, newValue: any): Promise<void> {
    const res = await fetch(`${API_BASE}/excel/cell/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheetName, rowNumber, columnKey, newValue })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update cell');
  },

  getExcelDownloadUrl(): string {
    return `${API_BASE}/excel/download`;
  },

  // Admin Stats
  async getAdminStats(): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/stats`);
    if (!res.ok) throw new Error('Failed to load admin stats');
    return res.json();
  }
};
