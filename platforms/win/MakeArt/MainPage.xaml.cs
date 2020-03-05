/**
 * MainPage.xaml.cs
 */


using System;
using System.Diagnostics;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;


namespace MakeArt
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private Uri CurrentUri;

        public MainPage()
        {
            InitializeComponent();
            this.webview.NavigationFailed += Webview_NavigationFailed;
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            try {
                CurrentUri = new Uri(e.Parameter as string);
            } catch (Exception ex) {
                Debug.WriteLine("ERROR: MainPage: OnNavigatedTo: " + ex);
            }

            this.webview.Navigate(CurrentUri);
        }

        private void Webview_NavigationFailed(object sender, WebViewNavigationFailedEventArgs e)
        {
            Frame.Navigate(typeof(OfflinePage), CurrentUri.ToString());
        }
    }
}
