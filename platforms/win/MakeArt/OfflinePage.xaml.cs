/**
 * OfflinePage.xaml.cs
 */


using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Windows.Networking.Connectivity;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;


namespace MakeArt
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class OfflinePage : Page
    {
        private NetworkStatusChangedEventHandler NetworkStatusCallback;
        private Uri CurrentUri;

        public OfflinePage()
        {
            this.InitializeComponent();
            NetworkStatusCallback = new NetworkStatusChangedEventHandler(OnNetworkStatusChange);
            NetworkInformation.NetworkStatusChanged += NetworkStatusCallback;
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            try {
                CurrentUri = new Uri(e.Parameter as string);
            } catch (Exception ex) {
                Debug.WriteLine("ERROR: OfflinePage: OnNavigatedTo: " + ex);
            }
        }

        async void OnNetworkStatusChange(object sender)
        {
            // get the ConnectionProfile that is currently used to connect to the Internet                
            ConnectionProfile InternetConnectionProfile = NetworkInformation.GetInternetConnectionProfile();

            if (InternetConnectionProfile != null) {
                await Refresh();
            }
        }

        private async void CheckConnection_Click(object sender, RoutedEventArgs e)
        {
            bool result = await Windows.System.Launcher.LaunchUriAsync(new Uri("ms-settings:network"));
        }

        private async void Refresh_Click(object sender, RoutedEventArgs e)
        {
            await Refresh();
        }

        private async Task Refresh()
        {
            await Windows.ApplicationModel.Core.CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal,
                () =>
                {
                    this.Frame.Navigate(typeof(MainPage), CurrentUri.ToString());
                });
        }
    }
}
